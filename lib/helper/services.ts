

import * as bcrypt from 'bcrypt';

export class Services {

    public encrypt(string: string) {
        let salt = bcrypt.genSaltSync(10);
        let crypted = bcrypt.hashSync(string, salt);
        return crypted;
    };
    public async decrypt(password: string, hash: string) {
        const hashedPassword = new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });

        return hashedPassword;
    };

}