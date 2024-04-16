const Slotsdates = [];

function slot() {
  for (let i = 9; i < 23; i++) {
    Slotsdates.push({
      bBooktime: i,
      btablenum: null,
      bBookdate: "",
      bstatus: "",
      bid: null,
      bppl: null,
      bemail: "",
      bookingid:null
    });
  }
}

slot();
export default Slotsdates;




