require('dotenv').config();
const SteamUser = require('steam-user');
const readline = require('readline');

const user = new SteamUser();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Kullanıcıdan Steam Guard kodunu isteme
rl.question('Steam Guard kodunu girin: ', (steamGuardCode) => {
    const logOnOptions = {
        accountName: process.env.STEAM_USERNAME,
        password: process.env.STEAM_PASSWORD,
        twoFactorCode: steamGuardCode // Kullanıcının girdiği kod
    };

    user.logOn(logOnOptions);

    user.on('loggedOn', () => {
        console.log(`${logOnOptions.accountName} - Successfully logged on`);
        user.setPersona(1);
        user.gamesPlayed([440,730,570]);
        rl.close(); // Kullanıcı giriş yaptıktan sonra terminal girişini kapat
    });

    user.on('error', (err) => {
        console.log(`Giriş başarısız: ${err.message}`);
        rl.close(); // Hata oluşursa giriş istemini kapat
    });
});
//via kayapoter alto and lxtard
