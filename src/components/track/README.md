## typings union type together string

https://www.typescriptlang.org/play?ssl=15&ssc=1&pln=1&pc=1#code/C4TwDgpgBAQgrgSwDbAQOwOIEECiA3CNYAZygF4AoKKAHygHIBDAE2YH0xGQBbQ4N9ADMA9vSq0GLdsGFsAxowBOwMdTpNWbGWwDuCYgAsk+lePUAjCAHN08gxDkBrYXFNqGc+05f8wi4VaKEMTE9ADcFJEQAB5gwspQgnBocqjCaFDAioxO+HwAFMJgaWjEAFywiCjo2HlExACUFXjCCMwRMXEJSSklmdm5BESFxQjp5VDEWehWTVAtbR2x8cCJyaljGVk5jnXAIyUTU4ozDVAA3uJy48JIEAB0SAEHm40UAL4U24MFGuycPD4AjQImIzEE9AaESAA

```ts
type BuiltinGAEvents =
  | "add_payment_info"
  | "add_to_cart"
  | "add_to_wishlist"
  | "begin_checkout"
  | "checkout_progress";

export function trackEvent(options: BuiltinGAEvents): void;
export function trackEvent(options: string): void;
export function trackEvent(options: string) {
  console.log(options);
}
trackEvent("add_payment_infosdf");
```
