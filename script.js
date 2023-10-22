let fileSystem = {
    "readme.txt": "Nothing to see here...",
    ".secret": {
        "remember.txt": "I created a super secred command called 'hack'.\nNobody is allowed to find out."
    }
};
let firstPrompt = true;
let nodejsCodeHistory = [];

let pathColor = "[;#3b78ff;]"
let usernameColor = "[;#16c60c;]"
let dirColor = pathColor

let sorryStatement = "[[;#ff0000;]Insufficient Permissions.]";
let username = "visitor";
let hostname = "krischer.dev";
let fakePathPrefix = "~";
let currentWorkingDir = "";
let secretLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

function isDir(path) {
    let current = fileSystem;
    path.split('/').forEach(function (item) {
        if (item !== "") {
            current = current[item];
        }
    });
    return typeof current === "object";
}

function init() {
}

function greetings() {
    return banner.innerHTML
}

function prompt() {
    return `[${usernameColor}${username}@${hostname}]:[${pathColor}${fakePathPrefix}${currentWorkingDir}] $ `// "[[b;green;]" + username + "@" + hostname + "]:[[b;blue;]/home/" + username + currentWorkingDir + "]$ ";
}

function currentFolder() {
    let current = fileSystem;
    currentWorkingDir.split('/').forEach(function (item) {
        if (item !== "") {
            current = current[item];
        }
    });
    return current
}

function directories() {
    let dirArray = []
    let current = currentFolder()
    for (let key in current) {
        if (current[key] !== undefined) {
            if (typeof current[key] === "object") {
                dirArray.push(key);
            }
        }
    }
    return dirArray
}

function files() {
    let current = currentFolder()
    let fileArray = [];
    for (let key in current) {
        if (current[key] !== undefined) {
            if (typeof current[key] === "string") {
                fileArray.push(key);
            }
        }
    }
    return fileArray
}

function commands() {
    return {
        cat: function (value) {
            let current = currentFolder()
            let fileArray = files();
            if (fileArray.includes(value)) {
                this.echo(current[value]);
            } else {
                this.echo("No such file: " + value);
            }
        },
        cd: function (value) {
            let pathTransferArray = [];
            if (value === "~") {
                currentWorkingDir = "";
                this.set_prompt(prompt());
            } else if (value === "/") {
                this.echo("Access denied!");
            } else if (value === "..") {
                if (currentWorkingDir === "" || currentWorkingDir === "/") {
                    this.echo("Access denied!");
                } else {
                    pathTransferArray = currentWorkingDir;
                    pathTransferArray = pathTransferArray.split("/");
                    pathTransferArray.pop();
                    currentWorkingDir = (pathTransferArray.join("/"));
                    this.set_prompt(prompt());
                }
            } else {
                let dirArray = directories();
                if (dirArray.includes(value)) {
                    currentWorkingDir += "/" + (value);
                    this.set_prompt(prompt());
                } else {
                    this.echo(`bash: cd: ${value}: No such file or directory`);
                }
            }
        },
        date: function () {
            const date = new Date();
            this.echo(date.toLocaleString());
        },
        echo: function (value) {
            this.echo("[[;#ff00ff;]" + value + "]");
        },
        help: function () {
            let cmds = []
            for (c in commands()) {
                if (c !== 'hack') {
                    cmds.push(c)
                }
            }
            cmds.sort()
            this.echo(cmds)
        },
        history: function () {
            this.echo(sorryStatement);
        },
        ls: function (...args) {
            let current = fileSystem;
            currentWorkingDir.split('/').forEach(function (item) {
                if (item !== "") {
                    current = current[item];
                }
            });
            let files = []
            for (let key in current) {
                if (current[key] !== undefined) {
                    if (typeof current[key] === "object") {
                        files.push(`[${dirColor}${key}]`)
                    } else {
                        files.push(key)
                    }
                }
            }
            files.sort()
            this.echo(files)
        },
        hack: function () {
            window.location.href = secretLink;
        },
        mkdir: function (value) {
            this.echo(sorryStatement);
        },
        mv: function (value1, value2) {
            this.echo(sorryStatement);
        },
        pwd: function () {
            this.echo("Current working directory: [[;#ff00ff;]" + fakePathPrefix + currentWorkingDir + "]");
        },
        rm: function (value) {
            this.echo(sorryStatement);
        },
        touch: function (value) {
            this.echo(sorryStatement);
        },
        uname: function () {
            this.echo("Linux")
        },
        whoami: function () {
            this.echo(username);
        }
    }
}

$(document).ready(() => {
    init();
    $("body").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings(),
    });
});
