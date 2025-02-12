# PSPDFKit for Salesforce Integration

## Integrate into a New Salesforce Project as a Lightning Web Component

PSPDFKit for Salesforce enables you to open PDF, JPG, PNG, and TIFF files inside Salesforce. This unlocks the full functionality of PSPDFKit in Salesforce, including PDF generation, redaction, and signatures.

This README explains how to integrate PSPDFKit into a new Salesforce project. The integration works as a [Lightning web component (LWC)][lwc] that you can add to any Salesforce organization.

For more information on integrating PSPDFKit into an existing Salesforce project, see the [PSPDFKit for Salesforce documentation][salesforce docs].

PSPDFKit for Salesforce shares the same APIs as Nutrient Web SDK Standalone. For more information on customizing your Salesforce application, see the [Nutrient Web SDK Standalone documentation][web docs].

## Requirements

Before continuing, perform all of the following actions:

- Set up a [Salesforce Developer Edition account][developer].
- Install the [Salesforce CLI][].
- Install the [latest stable version of Node.js][node.js].
- Install a package manager compatible with [npm][about-npm]. This README contains usage examples for the [npm client][npm-client], which is installed with Node.js by default.

## Deploying the Package

To deploy the PSPDFKit package to your Salesforce organization, follow these steps.

1. Download the [PSPDFKit for Salesforce project][zip] from GitHub, and then unpack the ZIP file.

   Alternatively, run the following terminal command to clone the [PSPDFKit for Salesforce repository][repo] from GitHub:

   ```bash
   git clone https://github.com/PSPDFKit/salesforce.git
   ```

2. In the terminal, go to the PSPDFKit for Salesforce project folder and run the following command to install the PSPDFKit npm module.

   Use the following code for npm:

   ```npm
   npm install
   ```

   Use the following code for Yarn:

   ```yarn
   yarn install
   ```

3. The PSPDFKit for Salesforce integration example now makes use of the PSPDFKit version available from our CDN at https://cdn.cloud.pspdfkit.com/pspdfkit-web, which means it's no longer limited by Salesforce's upload assets size 5MB limit.

In order to set the PSPDFKit version you want to use, open `./force-app/main/default/pages/PSPDFKit_InitPSPDFKit.page` and edit the line 7 to reflect the PSPDFKit version. For example, in order to use version 2024.4.0, you should change the URL pointing to the CDN to:

    ```html
    <script src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@2024.4.0/pspdfkit.js" type="text/javascript"></script>
    ```

    You can find the latest version of Nutrient Web SDK in the [PSPDFKit changelog](https://www.nutrient.io/changelog/web/).

4. Run the following command in the terminal to start the Salesforce authentication process:

   ```bash
   sfdx force:auth:web:login --setalias mySalesforceOrg --instanceurl https://login.salesforce.com --setdefaultusername
   ```

5. In the browser window that opens, log in to your Salesforce organization and authorize the Salesforce CLI.

6. In the terminal, run the following command from the PSPDFKit for Salesforce project’s root folder:

   ```bash
   sfdx force:source:deploy -x manifest/package.xml
   ```

## Enabling Users to Use PSPDFKit

To enable users of your Salesforce organization to use PSPDFKit, follow these steps.

1. In Salesforce, go to **Users** > **Permission Sets**.

2. Find **PSPDFKit Admin Access** in the list and click it.

3. Click **Manage Assignments**.

4. Click **Add Assignment**.

5. Select the users you want to authorize to use PSPDFKit.

6. Click **Next**, and then click **Assign**.

## Changing the Security Settings

PSPDFKit for Salesforce requires Lightning Locker to protect Lightning web components, but Salesforce uses Lightning Web Security by default. To change the default security settings, follow these steps.

1. In Salesforce, go to **Security** > **Session Settings**.

2. Deselect **Use Lightning Web Security for Lightning web components**.

3. Scroll down and click **Save**.

## Using the PSPDFKit for Salesforce Integration

To use PSPDFKit in your Salesforce organization, follow these steps.

1. Ensure you’re logged in as a user authorized to use PSPDFKit.

2. In the top-right corner, open the App Launcher.

3. Search for and select **PSPDFKit**.

4. Click **browse** to upload local PDF files, or open a file from Salesforce.

## Next Steps

- [Open documents from Salesforce][]
- [Save files back to Salesforce][]

[web docs]: https://www.nutrient.io/guides/web/
[salesforce docs]: https://www.nutrient.io/getting-started/web-integrations/?product=salesforce&project=existing-project
[lwc]: https://developer.salesforce.com/docs/component-library/documentation/en/lwc
[developer]: https://developer.salesforce.com/signup
[salesforce cli]: https://developer.salesforce.com/tools/sfdxcli
[node.js]: https://nodejs.org/en/download/
[about-npm]: https://docs.npmjs.com/about-npm
[npm-client]: https://docs.npmjs.com/cli/v7/commands/npm
[open documents from salesforce]: https://www.nutrient.io/guides/web/open-a-document/from-salesforce/
[save files back to salesforce]: https://www.nutrient.io/guides/web/save-a-document/to-salesforce/
[zip]: https://github.com/PSPDFKit/salesforce/archive/refs/heads/master.zip
[repo]: https://github.com/PSPDFKit/salesforce/
