# a simple ssh_config parser written with typescript-deno

now I have so many entries in my ~/.ssh/config and like to make easy to find one.
this is a simple solution. this cli app returns the entry as JSON.
```
Usage:
  sshconfig alias
```

for example like that:
```
❯ sshconfig myhost
{
  Host: "myhost",
  HostName: "xxx.xx.xx.x",
  Port: "2222",
  User: "me",
  IdentityFile: "~/.ssh/id_rsa"
}
```

## requirement
- deno
- environment variable as $HOME, on which .ssh directory is located.

## install
```
❯ deno install --name sshconfig --allow-read --allow-env https://raw.githubusercontent.com/yoshito-maeoka/sshconfig/main/index.ts
```
