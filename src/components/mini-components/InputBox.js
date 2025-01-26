import { toLower } from "lodash";
import React, { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const InputBox = ({ lable, fun, error, errorMsg, value, type, disabled }) => {
  const [appear, setAppear] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    type === "password" ? setAppear(true) : setAppear(false);
  }, [type]);

  return (
    <div className="mt-3 flex flex-col">
      <label
        className="block mb-0.5 font-medium relative text-[var(--text-color)] after:absolute after:content-['*'] after:text-red-500 after:pl-0.5"
        htmlFor="email"
      >
        {lable}
      </label>
      <div className="relative">
        <input
          disabled={!!disabled}
          required
          type={show ? "text" : type}
          className={
            appear
              ? // true
                "peer placeholder:text-[var(--text-color)] bg-[var(--input-color)] text-[var(--para-color)] w-full py-4 ps-[20px] pe-[38px] rounded-2xl border outline-none font-semibold shadow-[0px_0px_15px_rgba(0,0,0,0.05)]"
              : // flase
                "peer placeholder:text-[var(--text-color)] bg-[var(--input-color)] text-[var(--para-color)] w-full py-4 ps-[20px] pe-[20px] rounded-2xl border outline-none font-semibold shadow-[0px_0px_15px_rgba(0,0,0,0.05)]"
          }
          id="email"
          onChange={fun}
          value={value}
          placeholder={`Enter your ${toLower(lable)}`}
        />
        {appear && (
          <div
            className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <BiShow size={"24px"} color="var(--text-color)" />
            ) : (
              <BiHide size={"24px"} color="var(--text-color)" />
            )}
          </div>
        )}
      </div>
      {error && <p className="block text-red-600 text-sm ">* {errorMsg}</p>}
    </div>
  );
};

export default InputBox;
