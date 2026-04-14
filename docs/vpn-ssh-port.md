# 更改服务器SSH端口适配VPN

有些服务器的安全策略，会限制端口仅允许安全组指定ip访问，而VPN通常会拦截22端口，因为SSH 可以：
跑隧道（反向代理、端口转发）
搭建二级代理
做长期稳定连接
对机场来说 = 风险用户。

所以需要更改SSH默认端口

步骤：
1。登录服务器
2。编辑ssh_config文件
```bash
vim /etc/ssh/sshd_config
Port 4933
```

3。重启SSH服务
```bash
sudo systemctl restart sshd
```
4。验证端口是否更改
```bash
ss -tlnp | grep ssh
```
应显示所示
````
LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=495814,fd=6))                                                           
LISTEN 0      128          0.0.0.0:4933      0.0.0.0:*    users:(("sshd",pid=495814,fd=3))                                                           
LISTEN 0      128             [::]:22           [::]:*    users:(("sshd",pid=495814,fd=7))                                                           
LISTEN 0      128             [::]:4933         [::]:*    users:(("sshd",pid=495814,fd=4))

````
