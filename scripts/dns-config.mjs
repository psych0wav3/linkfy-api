#!/usr/bin/env node

import { exec } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
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
  const spinner = ora(`${chalk.blue('Checking for Homebrew...')}`).start();
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
    `${chalk.blue('Checking for dnsmasq installation...')}`,
  ).start();
  try {
    await runCommand('brew ls --versions dnsmasq');
    spinner.succeed(`${chalk.green('dnsmasq is installed!')}`);
    return true;
  } catch {
    spinner.info(`${chalk.yellow('dnsmasq is not installed.')}`);
    return false;
  }
}

async function installDnsmasq() {
  const spinner = ora(`${chalk.blue('Installing dnsmasq...')}`).start();
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
    `${chalk.blue(`Obtaining IP address from ${interfaceName}...`)}`,
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
  const regex = new RegExp(`^address=\/${domain}\/.+`, 'm');
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
    process.chdir(process.env.HOME || '/tmp');
    await runCommand('pgrep -x dnsmasq');
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

async function main() {
  console.log(
    chalk.magenta.bold('\nStarting DNS configuration script... 🚀\n'),
  );

  await checkHomebrew();
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
      default: 'link.linkfy.com.br',
    },
  ]);

  const interfaceName = answers.interfaceName;
  const domain = answers.domain;
  const ip = await getIPAddress(interfaceName);

  await updateDnsmasqConfig(domain, ip);
  await restartDnsmasq();
  console.log(
    chalk.magenta.bold('\nDNS configuration completed successfully. 🎉\n'),
  );
}

main();
