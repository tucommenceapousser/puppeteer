<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [puppeteer](./puppeteer.md) &gt; [Protocol](./puppeteer.protocol.md) &gt; [Network](./puppeteer.protocol.network.md) &gt; [BlockedSetCookieWithReason](./puppeteer.protocol.network.blockedsetcookiewithreason.md)

## Protocol.Network.BlockedSetCookieWithReason interface

A cookie which was not stored from a response with the corresponding reason.

<b>Signature:</b>

```typescript
export interface BlockedSetCookieWithReason 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [blockedReasons](./puppeteer.protocol.network.blockedsetcookiewithreason.blockedreasons.md) | [SetCookieBlockedReason](./puppeteer.protocol.network.setcookieblockedreason.md)<!-- -->\[\] | The reason(s) this cookie was blocked. |
|  [cookie](./puppeteer.protocol.network.blockedsetcookiewithreason.cookie.md) | [Cookie](./puppeteer.protocol.network.cookie.md) | The cookie object which represents the cookie which was not stored. It is optional because sometimes complete cookie information is not available, such as in the case of parsing errors. |
|  [cookieLine](./puppeteer.protocol.network.blockedsetcookiewithreason.cookieline.md) | string | The string representing this individual cookie as it would appear in the header. This is not the entire "cookie" or "set-cookie" header which could have multiple cookies. |
