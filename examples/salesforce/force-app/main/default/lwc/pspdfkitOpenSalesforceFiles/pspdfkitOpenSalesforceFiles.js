import getAttachmentDetails from "@salesforce/apex/PSPDFKitController.getAttachmentDetails";
import { CurrentPageReference } from "lightning/navigation";
import { LightningElement, track, wire } from "lwc";

export default class pspdfkitOpenSalesforceFiles extends LightningElement {
  @track isModalOpen;
  @track recordId;
  @track fileDetails = [];
  @track noRecordFound = false;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.recordId = currentPageReference.state.recordId;
      console.log("this.recordId", this.recordId);
    }
  }
  connectedCallback() {
    getAttachmentDetails({ record_Id: this.recordId }).then((data) => {
      this.fileDetails = data;
      if (
        this.fileDetails === undefined ||
        this.fileDetails == null ||
        this.fileDetails.length === 0
      ) {
        this.noRecordFound = true;
      } else {
        this.noRecordFound = false;
      }
      console.log("FILEDETAIL::", JSON.stringify(this.fileDetails));
    });
  }
  closeModal() {
    this.isModalOpen = false;
  }
  viewButton(event) {
    if (
      this.recordId == null ||
      this.recordId === undefined ||
      this.recordId === ""
    ) {
      const itemIndex = event.currentTarget.dataset.index;
      this.rowSelected = this.fileDetails[itemIndex].Id;
      this.dispatchEvent(new CustomEvent("pass", { detail: this.rowSelected }));
    } else {
      const itemIndex = event.currentTarget.dataset.index;
      this.rowSelected = this.fileDetails[itemIndex].Id;
      window.open(
        `/apex/PSPDFKit_InitPSPDFKit?id=${this.rowSelected}`,
        "_blank",
      );
    }
  }
}
