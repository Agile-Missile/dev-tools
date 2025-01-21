# @agilejs/cli

## Installation

To install the @agilejs/cli globally, run the following command:

```bash
npm install @agilejs/cli -g
```

Once installed, you can use the `mini` command to run the CLI.

## Preview

To preview your miniprogram assets, use the following command:

```bash
mini preview --privateKey="/.cache/private.xxxxxxxx.key" --miniVer="1.0.0" --miniDesc="This is a test" --format="image" --output=".dist" --filename="preview.png"
```

This command will generate a preview of your miniprogram assets using the specified private key, version, description, format, output directory, and filename.

## Upload

To upload your miniprogram assets, use the following command:

```bash
mini upload --privateKey="/.cache/private.xxxxxxxx.key" --miniVer="1.0.0" --miniDesc="This is a test"
```
