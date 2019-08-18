# Eth2FA
A module to add 2 factor authentication to Ethereum transactions



##### 1. Request Eth2FA public key
Use this public key to generate a ethereum 2/3 multi-sig wallet contract.

```
GET https://eth2fa.com/key
```


Example Request:
``` 
POST /key HTTP/1.1
Host: bitbuy.ca
Connection: keep-alive
Content-Length: 75
Accept: */*
Origin: https://eth2fa.com
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
```

Data Returned:
```
{
    publicKey: 0x95fc2b5ff1f40c0df89183eceb8db8692b900a88
}
```

--------------------------------

##### 2. Setup Google Authentication
Request a google authentication secret key to associate with the multi-sig wallet contract. 

```
POST https://eth2fa.com/setup
Query Body:
{
   "wallet": "0x95fc2b5ff1f40c0df89183eceb8db8692b900a88",
   "label": "MyWallet"
}


```
Example Request:
``` 
POST /setup HTTP/1.1
Host: bitbuy.ca
Connection: keep-alive
Content-Length: 75
Accept: */*
Origin: https://eth2fa.com
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
```

Data Returned:
```
{
    secret: otpauth://totp/Eth2FA:MyWallet?secret=JBSWY3DPEHPK3PXP&issuer=Eth2FA
}
```



--------------------------------

##### 3. Confirm Google Authentication Setup
Confirm that your google authentication secret has been stored by the user.

```
POST https://eth2fa.com/confirm-setup
Query Body:
{
   "wallet": "0x95fc2b5ff1f40c0df89183eceb8db8692b900a88",
   "code": "855811"
}


```
Example Request:
``` 
POST /confirm-setup HTTP/1.1
Host: bitbuy.ca
Connection: keep-alive
Content-Length: 75
Accept: */*
Origin: https://eth2fa.com
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
```

Data Returned:
```
{
    result: "success"
}
```


--------------------------------

##### 4. Solve 2FA
Solve a google 2FA challenge for a specified multi-sig wallet, if successful the server will send a transaction to the multi-sig wallet contract and enable the pending transaction to go through. 

```
POST https://eth2fa.com/solve
Query Body:
{
   "wallet": "0x95fc2b5ff1f40c0df89183eceb8db8692b900a88",
   "code": "855811"
}


```
Example Request:
``` 
POST /solve HTTP/1.1
Host: bitbuy.ca
Connection: keep-alive
Content-Length: 75
Accept: */*
Origin: https://eth2fa.com
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
```

Data Returned:
```
{
    result: "success"
}
```