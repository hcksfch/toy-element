export default function () {
  if (PROD) {
    const logo = `
_______________________________________________________________________________

        ___________                   .__                         __  .__    .__     
    \__    ___/___ ___.__.   ____ |  |   ____   _____   _____/  |_|  |__ |  |__  
    |    | /  _ <   |  | _/ __ \|  | _/ __ \ /     \ /    \   __\  |  \|  |  \ 
    |    |(  <_> )___  | \  ___/|  |_\  ___/|  Y Y  \   |  \  | |   Y  \   Y  \
    |____| \____// ____|  \___  >____/\___  >__|_|  /___|  /__| |___|  /___|  /
                \/           \/          \/      \/     \/          \/     \/ 

_______________________________________________________________________________
    `;
    const rainbowGrandient = `
    background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
    `;

    console.info(`%c${logo}`, rainbowGrandient);
  } else if (DEV) {
    console.log("[toy-elementhh] development mode");
  }
}
