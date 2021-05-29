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
