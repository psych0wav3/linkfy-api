#!/usr/bin/env node

import { exec } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import cliProgress from 'cli-progress';
import sudo from 'sudo-prompt';

function execSudo(command) {
  return new Promise((resolve, reject) => {
    sudo.exec(
      command,
      { name: 'DNS Setup Script' },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      },
    );
  });
}

function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function checkHomebrew() {
  const spinner = ora(`${chalk.blue('Checking for Homebrew...')} 🧐`).start();
  try {
    await runCommand('command -v brew');
    spinner.succeed(`${chalk.green('Homebrew is installed!')} ✅`);
  } catch {
    spinner.fail(
      `${chalk.red('Homebrew is not installed. Please install Homebrew before running this script.')} ❌`,
    );
    process.exit(1);
  }
}

async function checkDnsmasqInstalled() {
  const spinner = ora(
    `${chalk.blue('Checking for dnsmasq installation...')} 🔍`,
  ).start();
  try {
    await runCommand('brew ls --versions dnsmasq');
    spinner.succeed(`${chalk.green('dnsmasq is installed!')} ✅`);
    return true;
  } catch {
    spinner.info(`${chalk.yellow('dnsmasq is not installed.')} 😞`);
    return false;
  }
}

async function installDnsmasq() {
  const spinner = ora(`${chalk.blue('Installing dnsmasq...')} 🚀`).start();
  try {
    await runCommand('brew install dnsmasq');
    spinner.succeed(`${chalk.green('dnsmasq installed successfully!')} ✅`);
  } catch {
    spinner.fail(`${chalk.red('Failed to install dnsmasq.')} ❌`);
    process.exit(1);
  }
}

async function getIPAddress(interfaceName) {
  const spinner = ora(
    `${chalk.blue(`Obtaining IP address from ${interfaceName}...`)} 📡`,
  ).start();
  try {
    const { stdout } = await runCommand(`ipconfig getifaddr ${interfaceName}`);
    const ip = stdout.trim();
    if (!ip) throw new Error('No IP found');
    spinner.succeed(`${chalk.green(`IP address obtained: ${ip}`)} 🎉`);
    return ip;
  } catch {
    spinner.fail(
      `${chalk.red(`Could not obtain IP address from interface ${interfaceName}.`)} ❌`,
    );
    process.exit(1);
  }
}

async function updateDnsmasqConfig(domain, ip) {
  const confPath = '/usr/local/etc/dnsmasq.conf';
  console.log(
    chalk.blue(`\nUpdating dnsmasq configuration for ${domain}... 🛠️`),
  );
  if (!fs.existsSync(confPath)) {
    console.log(chalk.yellow(`${confPath} not found. Creating new file...`));
    try {
      fs.writeFileSync(confPath, '');
    } catch {
      console.error(chalk.red('Failed to create configuration file.'));
      process.exit(1);
    }
  }
  let configContent = fs.readFileSync(confPath, 'utf8');
  const regex = new RegExp(`^address=\\/${domain}\\/.+`, 'm');
  if (regex.test(configContent)) {
    configContent = configContent.replace(regex, `address=/${domain}/${ip}`);
    fs.writeFileSync(confPath, configContent);
    console.log(chalk.green(`Updated line for ${domain} in ${confPath}. ✅`));
  } else {
    fs.appendFileSync(confPath, `\naddress=/${domain}/${ip}\n`);
    console.log(chalk.green(`Added line for ${domain} to ${confPath}. ✅`));
  }
}

async function restartDnsmasq() {
  const spinner = ora(
    `${chalk.blue('Restarting dnsmasq service...')} 🔄`,
  ).start();
  try {
    // Muda para um diretório legível, como o diretório HOME ou /tmp
    process.chdir(process.env.HOME || '/tmp');
    // Verifica se dnsmasq está rodando (sem sudo)
    await runCommand('pgrep -x dnsmasq');
    // Reinicia o dnsmasq garantindo que o comando seja executado a partir de um diretório legível
    await execSudo('cd /tmp && brew services restart dnsmasq');
    spinner.succeed(`${chalk.green('dnsmasq restarted successfully!')} ✅`);
  } catch {
    try {
      process.chdir(process.env.HOME || '/tmp');
      await execSudo('cd /tmp && brew services start dnsmasq');
      spinner.succeed(`${chalk.green('dnsmasq started successfully!')} ✅`);
    } catch {
      spinner.fail(`${chalk.red('Failed to start dnsmasq.')} ❌`);
      process.exit(1);
    }
  }
}

async function waitForDnsmasq() {
  console.log(chalk.blue('\nWaiting for dnsmasq to stabilize... ⏳'));
  const bar = new cliProgress.SingleBar({
    format: `${chalk.cyan('Progress')} [{bar}] {percentage}%`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  const waitTime = 2000; // 2 seconds
  const steps = 20;
  bar.start(steps, 0);
  for (let i = 0; i < steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, waitTime / steps));
    bar.update(i + 1);
  }
  bar.stop();
}

async function testDnsResolution(domain, ip) {
  const spinner = ora(`${chalk.blue('Testing DNS resolution...')} 🔎`).start();
  try {
    const { stdout } = await runCommand(`nslookup ${domain} 127.0.0.1`);
    spinner.stop();
    console.log(chalk.white(stdout));
    if (stdout.includes(ip)) {
      console.log(
        chalk.green(
          `NSLookup returned the expected IP: ${ip}. DNS is configured correctly. 🎉`,
        ),
      );
    } else {
      console.error(
        chalk.red(
          'NSLookup did not return the expected IP. Please verify the configuration. ❌',
        ),
      );
      process.exit(1);
    }
  } catch {
    spinner.fail(`${chalk.red('Error during nslookup.')} ❌`);
    process.exit(1);
  }
}

async function main() {
  console.log(
    chalk.magenta.bold('\nStarting DNS configuration script... 🚀\n'),
  );

  // Check for Homebrew
  await checkHomebrew();

  // Check if dnsmasq is installed
  let isDnsmasqInstalled = await checkDnsmasqInstalled();
  if (!isDnsmasqInstalled) {
    const { install } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'install',
        message: chalk.yellow(
          'dnsmasq is not installed. Would you like to install it?',
        ),
        default: true,
      },
    ]);
    if (install) {
      await installDnsmasq();
    } else {
      console.error(chalk.red('dnsmasq is required. Exiting.'));
      process.exit(1);
    }
  }

  // Ask for network interface and domain (with defaults)
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'interfaceName',
      message: 'Enter the network interface to use:',
      default: 'en0',
    },
    {
      type: 'input',
      name: 'domain',
      message: 'Enter the domain to configure:',
      default: 'link.dotz.com.br',
    },
  ]);

  const interfaceName = answers.interfaceName;
  const domain = answers.domain;

  // Get machine's IP address
  const ip = await getIPAddress(interfaceName);

  // Confirm configuration update
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: chalk.yellow(
        `Update dnsmasq config for domain ${domain} with IP ${ip}?`,
      ),
      default: true,
    },
  ]);
  if (!confirm) {
    console.log(chalk.red('Operation cancelled by user. 🚫'));
    process.exit(0);
  }

  // Update dnsmasq config file
  await updateDnsmasqConfig(domain, ip);

  // Restart dnsmasq
  await restartDnsmasq();

  // Wait for stabilization with a progress bar
  await waitForDnsmasq();

  // Test DNS resolution
  await testDnsResolution(domain, ip);

  console.log(
    chalk.magenta.bold('\nDNS configuration completed successfully. 🎉\n'),
  );
}

main();
