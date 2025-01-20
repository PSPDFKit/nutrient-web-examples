@IsTest
public class PSPDFKitControllerTest {

    @testSetup static void setup() {
        Account testAccts = new Account(Name = 'TestAcct');
        insert testAccts;

        string textFile = 'This is a test data';
        ContentVersion docVer = New ContentVersion();
        docVer.ContentLocation = 'S';
        docVer.PathOnClient = 'Test.txt';
        docVer.Title = 'Test.txt';
        Blob textData = Blob.valueOf(textFile);
        docVer.VersionData = textData;
        insert docVer;

        string verId = [SELECT contentDocumentId FROM contentVersion where id =: docVer.id].contentDocumentId;
        ContentDocumentLink docLink = new ContentDocumentLink();
        docLink.ContentDocumentId = verId;
        docLink.LinkedEntityId = testAccts.Id;
        docLink.sharetype = 'I';
        docLink.Visibility = 'AllUsers';
        insert docLink;
    }

    @isTest
    static void testGetAttacmentDetails() {
        Account act = [SELECT id FROM Account];
        Test.startTest();
        List <ContentDocument> conDocList = PSPDFKitController.getAttachmentDetails(act.Id);
        Test.stopTest();
        System.assertEquals(1,conDocList.size());
    }

    @isTest
    static void testGetbase64Data() {
        Account act = [SELECT id FROM Account];
        ContentDocumentLink docLink = [SELECT contentDocumentId From ContentDocumentLink where LinkedEntityId=:act.Id];
        Test.startTest();
        Map<String,String> base64Data =  PSPDFKitController.getbase64Data(docLink.contentDocumentId);
        Test.stopTest();
        System.assertEquals(3,base64Data.size());
    }

    @isTest
    static void testGetFileDetail() {
        Account act = [SELECT id FROM Account];
        ContentDocumentLink docLink = [SELECT contentDocumentId From ContentDocumentLink where LinkedEntityId=:act.Id];
        Test.StartTest();
        ApexPages.StandardController sc = new ApexPages.StandardController(docLink);
        PSPDFKitController testAccPlan = new PSPDFKitController();

        PageReference pageRef = Page.PSPDFKit_InitPSPDFKit;
        pageRef.getParameters().put('id', String.valueOf(docLink.contentDocumentId));
        Test.setCurrentPage(pageRef);

        testAccPlan.getFileDetail();
        Test.StopTest();
    }
}