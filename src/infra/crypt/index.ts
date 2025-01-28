import { compare as _compare, hash as _hash } from 'bcrypt';

export class CryptService {
  public async compare(password: string, hash: string): Promise<boolean> {
    return await _compare(password, hash);
  }

  public async hash(password: string, salt: number): Promise<string> {
    return await _hash(password, salt);
  }
}
