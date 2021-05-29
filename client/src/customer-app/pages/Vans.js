// import React, { useState, Fragment, useEffect } from "react";
// import Map from "../../shared/components/Map";
// import axios from "axios";
// import VanModal from "../components/VanModal";
// export default function Vans() {
// 	// array of vendors
// const [vendors, setVendors] = useState([]);
// const [selected, setSelected] = useState(null);

// 	useEffect(() => {
// 		// used for cleanup
// 		let isMounted = true;

// 		// fetch list of vendors from db
// 		const fetchVendors = async () => {
// 			try {
// 				const res = await axios.get("/vendor");
// 				if (isMounted) {
// 					setVendors(res.data);
// 					console.log(vendors);
// 				}

// 				// console.log(vendors);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		};

// 		fetchVendors();

// 		return () => {
// 			isMounted = false;
// 		};
// 	}, [vendors]);

// 	return (
// 		<>
// 			<Map data={vendors} selected={selected} setSelected={setSelected} />
// 			{vendors.map((vendor) => {
// 				return (
// 					<div style={{ backgroundColor: "blue", position: "absolute", left: 50, bottom: 50 }}>
// 						{selected ? "popup" : ""}
// 					</div>

// 				);
// 			})}
// 			<button onClick={() => setSelected(null)}>Hello</button>
// 			<VanModal></VanModal>
// 		</>
// 	);
// }

import React, { useState, Fragment, useEffect } from "react";
import Map from "../../shared/components/Map";
import axios from "axios";
import { Wrapper } from "../pages/Vans.style";

export default function SimpleModal() {
  const [vendors, setVendors] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // used for cleanup
    let isMounted = true;

    // fetch list of vendors from db
    const fetchVendors = async () => {
      try {
        const res = await axios.get("/vendor");
        if (isMounted) {
          setVendors(res.data);
          // console.log(vendors);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVendors();

    return () => {
      isMounted = false;
    };
  }, [vendors]);

  return (
    <Fragment>
      <Map data={vendors} selected={selected} setSelected={setSelected} />

      {selected ? (
        <Wrapper>
          <div style={{}}>
            <h1>{selected.name}</h1>
            <button onClick={() => setSelected(null)}>&times;</button>
          </div>
        </Wrapper>
      ) : null}
    </Fragment>
  );
}

{
  /* <button type="button" onClick={handleOpen}>
Open Modal

</button> */
}

// <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                  <div style={modalStyle} className={classes.paper}>
//             <h2 id="simple-modal-title">Text in a modal</h2>
//             <p id="simple-modal-description">
//                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//       		</p>
//             {/* <SimpleModal /> */}
//        			 </div>
//             </Modal>
