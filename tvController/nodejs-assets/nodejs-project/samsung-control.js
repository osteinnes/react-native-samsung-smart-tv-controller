/*

This NodeJS-script opens a RN-bridge to your React-Native application.
This bridge can be communicated over from both sides. This is an efficient
way of implementing node features in a React-Native project, as long as it
is simple tasks. We are using the samsung-tv-remote library from NPM. 

samsung-tv-remote NPM : https://www.npmjs.com/package/samsung-tv-remote
RN-bridge NPM :         https://www.npmjs.com/package/nodejs-mobile-react-native

*/



var rn_bridge = require('rn-bridge');

const SamsungTvRemote = require('samsung-tv-remote');

let remote = new SamsungTvRemote({
  // Insert IP of your TV here.
  ip: 'xxxxxxxxxxxx'
});

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {

if(msg == 'menu'){

	remote.isTvAlive(() => {
  	remote.sendKey('KEY_MENU');
});

}else if(msg == 'mute') {

  	remote.isTvAlive(() => {
    remote.sendKey('KEY_MUTE');
});

} else if(msg == 'up'){

	remote.isTvAlive(() => {
  	remote.sendKey('KEY_UP');
});

} else if(msg == 'down'){

	remote.isTvAlive(() => {
  	remote.sendKey('KEY_DOWN');
});

} else if(msg == 'power') {

  remote.isTvAlive(() => {
    remote.sendKey('KEY_POWER');
});
}
  rn_bridge.channel.send(msg);
} );

// Inform react-native that the node-script is initialized.
rn_bridge.channel.send("The Samsung remote node script was deployed!");