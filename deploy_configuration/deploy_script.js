/* eslint-disable no-console */
console.log('>>> CUSTOM DEPLOY START <<<');

const { exec } = require('child_process');
const { spawn } = require('child_process');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';

const comando_cf_target = 'cf target';
const aEnviromentsData = [{
    org: "GPA SRL_wispin-dev",
    space: "dev",
    file: "deploy_configuration/BTP/dev.mtaext"
}];

let comandoDeploy = "cross-var cf bg-deploy mta_archives/test_CAP_$npm_package_version.mtar ";

if (process.argv.find(x => x === "--no-confirm")) {
    comandoDeploy = comandoDeploy + "--no-confirm -e ";
} else {
    comandoDeploy = comandoDeploy + "-e ";
}

exec(comando_cf_target, (error, stdout, stderr) => {
    if (error) {
        console.error(RED + `>>> ERROR: Errore durante l'esecuzione del comando: ${error.message}` + RESET);
        return;
    }

    if (stderr) {
        console.error(RED + `>>> ERROR: ${stderr}` + RESET);
        return;
    }

    // Dividiamo l'output in righe
    const righe = stdout.split('\n');

    let orgValue = '';
    let spaceValue = '';
    for (const riga of righe) {
        if (riga.startsWith('org:')) {
            orgValue = riga.split(':')[1].trim();
        } else if (riga.startsWith('space:')) {
            spaceValue = riga.split(':')[1].trim();
        }
    }

    // Stampiamo il valore di org
    console.log(`>>> Valore di org: ${orgValue}`);
    console.log(`>>> Valore di space: ${spaceValue}`);

    let oEnviromentsData = aEnviromentsData.find(x => x.org === orgValue && x.space === spaceValue);

    if (!oEnviromentsData) {
        console.error(RED + '>>> ERROR: Dati ambiente non trovati' + RESET);
        return;
    }

    comandoDeploy = comandoDeploy + oEnviromentsData.file;

    const processo = spawn(comandoDeploy, [], { stdio: 'inherit', shell: true });

    // Gestisci eventuali errori
    processo.on('error', (errore) => {
        console.error(RED + `>>> ERROR: Errore nell'esecuzione del comando: ${errore.message}` + RESET);
    });

    // Gestisci la chiusura del processo
    processo.on('close', (codice) => {
        console.log(`>>> Processo terminato con codice: ${codice}`);
    });
});


