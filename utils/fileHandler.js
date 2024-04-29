const lockFile = require('lockfile');
const fs = require('fs').promises;
const path = require('path');


const lockDir = './locks';


fs.mkdir(lockDir, { recursive: true })
    .then(() => console.log('Lock directory created'))
    .catch(err => console.error('Error creating lock directory:', err));

const acquireLock = async (lockKey, expirationTime) => {
    const lockFilePath = path.join(lockDir, lockKey);

    return new Promise((resolve, reject) => {
        lockFile.lock(lockFilePath, { retries: 10, stale: expirationTime * 1000 }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};


const releaseLock = async (lockKey) => {
    const lockFilePath = path.join(lockDir, lockKey);

    return new Promise((resolve, reject) => {
        lockFile.unlock(lockFilePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = { acquireLock, releaseLock };
