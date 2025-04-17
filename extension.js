const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
  console.log('Extension "linkit" is now active!');

  let disposable = vscode.commands.registerCommand('linkit.runShellScript', function () {
    const panel = vscode.window.createWebviewPanel(
      'shellRunner',
      'Shell Script Output',
      vscode.ViewColumn.One,
      {}
    );
    // 👇 Modify this to your actual script path or shell command
    const scriptPath = path.join(__dirname, './your-script.sh');

    exec(`bash "${scriptPath}"`, (err, stdout, stderr) => {
      if (err) {
        panel.webview.html = `<h2>Error</h2><pre>${err.message}</pre>`;
        return;
      }

      if (stderr) {
        panel.webview.html = `<h2>Shell Error</h2><pre>${stderr}</pre>`;
        return;
      }

      panel.webview.html = `<h2>Shell Output</h2><pre>${stdout}</pre>`;
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
