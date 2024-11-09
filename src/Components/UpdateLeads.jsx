import React, { useState, useEffect, useContext, useRef } from 'react'
import { ContextCrm } from "../ContextCrm/ContextCrm";
import { toast } from "react-toastify";
const UpdateLeads = ({ buttonRef }) => {
    const {
        // handleAddLeads,
        searchLeadsContact,
        handleSearchLeadsContact,
        searchLeadsProduct,
        handleSearchLeadsProduct,
        updateLeadsShow,
        setupdateLeadsShow,
        updateLeadsData,
        handleEditLeads
    } = useContext(ContextCrm);

    const ref = useRef(null);

    const [showContact, setshowContact] = useState(false);
    const [showProduct, setshowProduct] = useState(false);

    const [newLeads, setnewLeads] = useState({
        probability: updateLeadsData.lead_Stag_History.probability == "0" ? "50" : `${updateLeadsData.lead_Stag_History.probability}`,
        expectedClosingDate: updateLeadsData.lead_Stag_History.expectedClosingDate.split("T")[0] == "2024-11-01" ? '' : updateLeadsData.lead_Stag_History.expectedClosingDate.split("T")[0],
        expectedRevenue: updateLeadsData.lead.expectedRevenue == "0" ? "" : `${updateLeadsData.lead.expectedRevenue}`
    });
    const [contact, setContact] = useState({
        id: updateLeadsData.customer.id,
        name: updateLeadsData.customer.name,
    });
    const [product, setProduct] = useState({
        id: updateLeadsData.product.id === "9fcb649d-6b85-42c8-8946-bc8487452611" ? '' : updateLeadsData.product.id,
        name: updateLeadsData.product.name === "Product" ? '' : updateLeadsData.product.name
    });

    const onChangeNewLeads = (e) => {
        if (e.target.name === 'expectedRevenue' && e.target.value < 0) {
            return
        }
        setnewLeads({ ...newLeads, [e.target.name]: e.target.value });
    };

    const onChangeNewLeadsContact = (e) => {
        handleSearchLeadsContact(e.target.value);
        setContact({
            id: "",
            name: e.target.value,
        });
        setshowContact(true);
    };
    const handleSelectSuggestionContact = (Contact) => {
        setContact(Contact);
        setshowContact(false);
    };

    const onChangeNewLeadsProduct = (e) => {
        handleSearchLeadsProduct(e.target.value);
        setProduct({
            id: "",
            name: e.target.value,
        });
        setshowProduct(true);
    };
    const handleSelectSuggestionProduct = (Product) => {
        setProduct(Product);
        setshowProduct(false);
    };

    const [error, seterror] = useState({})
    const leadsValidations = () => {
        const validation = {}
        if (!Object.keys(contact).length) {
            validation.contact = "Please select a contact"
        }
        if (!product.id || !product.name) {
            validation.product = "Please select a product"
        }
        if (!newLeads.expectedRevenue) {
            validation.expectedRevenue = "Expected Revenue should be a positive number"
        }
        if (!newLeads.expectedClosingDate) {
            validation.expectedClosingDate = "Expected Closing Date should be a positive number"
        }
        return validation
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && buttonRef.current &&
                !buttonRef.current.contains(event.target)) {
                setupdateLeadsShow(false)
            }
        };

        if (updateLeadsShow) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, updateLeadsShow]);

    useEffect(() => {

    })

    return (
        <div
            ref={ref}

            className="flex flex-col w-full   items-start gap-8 p-6 bg-white rounded border border-gray-300 shadow-sm top-[99px] right-0 absolute">
            <div className="flex flex-col w-full items-start gap-6">
                <div className="flex flex-col w-[100%] items-start justify-center gap-2">
                    <p className="w-full text-[16px]  font-medium text-main-text-color">
                        Contact
                    </p>
                    <input
                        className={`w-full h-[36px] border rounded p-2 text-sm focus:outline-none focus:ring-0 transition
              ${contact.name ? '' : error.contact ? 'border-red-500 border' : ''}
              `}
                        type="text"
                        placeholder="Enter contact"
                        onChange={onChangeNewLeadsContact}
                        value={contact.name || ""}
                        readOnly
                    />
                    <p className="text-[12px] text-red-500">{contact.name ? '' : error.contact ? error.contact : ''}</p>
                    {showContact ? (
                        searchLeadsContact.length > 0 ? (
                            <ul className="w-full max-h-[300px] overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                                {searchLeadsContact.map((Contact, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectSuggestionContact(Contact)}
                                    >
                                        {Contact.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                    No User
                                </li>
                            </ul>
                        )
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col w-[100%] items-start justify-center gap-2">
                    <p className="w-full text-[16px]  font-medium text-main-text-color">
                        Product
                    </p>
                    <input
                        className={`w-full h-[36px] border rounded p-2 text-sm focus:outline-none focus:ring-0 transition
              ${product.name ? '' : error.product ? 'border-red-500 border' : ''}
              `}
                        type="text"
                        placeholder="e.g. Product"
                        onChange={onChangeNewLeadsProduct}
                        value={product.name || ""}
                    />
                    <p className="text-[12px] text-red-500">{product.name ? '' : error.product ? error.product : ''}</p>

                    {showProduct ? (
                        searchLeadsProduct.length > 0 ? (
                            <ul className="w-full max-h-[300px] overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                                {searchLeadsProduct.map((Product, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectSuggestionProduct(Product)}
                                    >
                                        {Product.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                    No Product
                                </li>
                            </ul>
                        )
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col w-[100%] items-start gap-2">
                    <p className="w-full text-[16px]  font-medium text-main-text-color">
                        Expected Revenue
                    </p>
                    <div className="flex items-center w-full">
                        <input
                            className={`w-full h-[36px] border rounded p-2 text-sm focus:outline-none focus:ring-0 transition
  ${newLeads.expectedRevenue ? '' : error.expectedRevenue ? 'border-red-500 border' : ''}
  `}
                            type="number"
                            placeholder="$0.00"
                            name="expectedRevenue"
                            onChange={onChangeNewLeads}
                            value={newLeads.expectedRevenue || ""}
                        />
                    </div>
                    <p className="text-[12px] text-red-500">{newLeads.expectedRevenue ? '' : error.expectedRevenue ? error.expectedRevenue : ''}</p>
                </div>
                <div className="flex flex-col w-[100%] items-start justify-center gap-3">
                    <p className="w-full text-[16px]  font-medium text-main-text-color">
                        Probability
                    </p>
                    <div className="flex w-full justify-center items-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="w-full h-2 bg-blue-500 rounded-lg cursor-pointer accent-blue-500"
                            name="probability"
                            onChange={onChangeNewLeads}
                            value={newLeads.probability || ""}
                        />
                        <div className=" w-[52px] h-[25px] flex justify-center items-center rounded-[4px] border-[1px] border-blue-500">
                            <span className="">
                                {newLeads.probability ? `%${newLeads.probability}` : "50%"}
                            </span>
                        </div>{" "}
                    </div>
                </div>
                <div className="flex flex-col w-full items-start justify-center gap-2">
                    <p className="w-full text-[16px]  font-medium text-main-text-color">
                        Expected Closing Date
                    </p>
                    <input
                        className={`w-full h-[36px] border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition
              ${newLeads.expectedClosingDate ? '' : error.expectedClosingDate ? 'border-red-500' : ''}
              `}
                        type="date"
                        placeholder="e.g. (mm/dd/yyyy)"
                        name="expectedClosingDate"
                        onChange={onChangeNewLeads}
                        value={newLeads.expectedClosingDate || ""}
                    />
                    <p className="text-[12px] text-red-500">{newLeads.expectedClosingDate ? '' : error.expectedClosingDate ? error.expectedClosingDate : ''}</p>
                </div>
            </div>
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={() => setupdateLeadsShow(false)}
                    className="flex h-[44px] items-center justify-center gap-3 px-3 bg-gray-200 border border-gray-300 rounded cursor-pointer hover:bg-gray-300 transition">
                    <p className="font-normal text-main-text-color text-sm">Discard</p>
                </button>
                <button
                    onClick={() => {
                        if (
                            contact.id &&
                            product.id &&
                            (newLeads.expectedClosingDate?.trim() || "").length > 0 &&
                            (newLeads.probability?.trim() || "").length > 0 &&
                            (newLeads.expectedRevenue?.trim() || "").length > 0
                        ) {

                            const updatedLeads = {
                                ...newLeads,
                                id: updateLeadsData.lead.id,
                                customerId: contact.id,
                                productId: product.id,
                                user_Id: JSON.parse(localStorage.getItem('userId')).value,
                            };
                            console.log(newLeads)
                            // handleAddLeads(updatedLeads, StageId, JSON.parse(localStorage.getItem('userId')).value);
                            handleEditLeads(updatedLeads)
                            setnewLeads({});
                            setContact({ id: "", name: "" });
                            setProduct({ id: "", name: "" });
                            setupdateLeadsShow(false)
                        } else {
                            toast.error("Please fill all the fields!");
                            seterror(leadsValidations())
                            console.log(error)
                            return;
                        }
                    }}
                    className="flex h-[44px] items-center justify-center gap-3 px-3 bg-blue-500 border border-blue-500 rounded cursor-pointer hover:bg-blue-600 transition"
                >
                    <p className="font-normal text-white text-sm">Update</p>
                </button>
            </div>
        </div>
    )
}

export default UpdateLeads