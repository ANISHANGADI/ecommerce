import React, { useEffect, useState } from "react";
//import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
//import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
    }
  }, [shippingInfo]);

  const submiHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, zipCode, country }));
    navigate("/confirm_order");
  };
  return (
    <div class="row wrapper mb-5">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
        >
          <h2 class="mb-4">Shipping Info</h2>
          <div class="mb-3">
            <label for="address_field" class="form-label">
              Address
            </label>
            <input
              type="text"
              id="address_field"
              class="form-control"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div class="mb-3">
            <label for="city_field" class="form-label">
              City
            </label>
            <input
              type="text"
              id="city_field"
              class="form-control"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div class="mb-3">
            <label for="phone_field" class="form-label">
              Phone No
            </label>
            <input
              type="tel"
              id="phone_field"
              class="form-control"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <div class="mb-3">
            <label for="postal_code_field" class="form-label">
              Postal Code
            </label>
            <input
              type="number"
              id="postal_code_field"
              class="form-control"
              name="postalCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <div class="mb-3">
            <label for="country_field" class="form-label">
              Country
            </label>
            <select
              id="country_field"
              class="form-select"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="Country1">India</option>
              <option value="Country2">Pakistan</option>
              <option value="Country3">United States</option>
              <option value="Country4">China</option>
              <option value="Country5">Brazil</option>
              <option value="Country6">Indonesia</option>
              <option value="Country7">Nigeria</option>
              <option value="Country8">Bangladesh</option>
              <option value="Country9">Russia</option>
              <option value="Country10">Japan</option>
              <option value="Country11">Mexico</option>
              <option value="Country12">Philippines</option>
              <option value="Country13">Ethiopia</option>
              <option value="Country14">Vietnam</option>
              <option value="Country15">Egypt</option>
              <option value="Country16">DR Congo</option>
              <option value="Country17">Germany</option>
              <option value="Country18">Iran</option>
              <option value="Country19">Turkey</option>
              <option value="Country20">France</option>
            </select>
          </div>

          <button id="shipping_btn" type="submit" class="btn w-100 py-2" onClick={submiHandler}>
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
