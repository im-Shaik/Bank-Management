import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import { Link } from "react-router-dom";

function Home({ notify }) {
  useEffect(() => {
    notify("Welcome to our Bank!");
  }, [notify]);

  return (
    // main screen here
    <main>
      <section>
        <Banner />
      </section>
      <section className="h-screen pt-5">
        <div className="container mx-auto">
          <h1 className="m-3 text-[var(--text-color)] font-bold text-center text-2xl md:text-4xl md:text-left ">
            Services
          </h1>

          <div className="flex gap-3 justify-center items-center flex-wrap p-2">
            <div className="max-w-2xl md:max-w-md mx-auto bg-[var(--section-bg)] rounded-xl shadow-md overflow-hidden ">
              <div className="flex md:block">
                <div className="hidden md:block shrink-0">
                  <img
                    className="object-cover h-full w-48 md:h-48 md:w-full"
                    src="https://images.unsplash.com/photo-1725714355442-4216013a29fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                    alt="Modern building architecture"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-[var(--heading-color)] font-semibold">
                    Withdraw and manage
                  </div>
                  <Link
                    to={"/login"}
                    className="block mt-1 text-lg leading-tight font-medium text-[var(--text-color)] hover:underline hover:text-[var(--heading-color)]"
                  >
                    Incredible accommodation for your withdraw and your
                    maintenance
                  </Link>
                  <p className="mt-2 text-[--para-color]">
                    When you are withdraw your money you have credit 2.5%
                    revenue generate every each withdraw on your account, and
                    your maintenance means you have sent money to someone
                    account that things also has credit 0.5% revenue on your
                    account.
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-2xl md:max-w-md mx-auto bg-[var(--section-bg)] rounded-xl shadow-md overflow-hidden ">
              <div className="flex md:block">
                <div className="hidden md:block shrink-0">
                  <img
                    className="object-cover h-full w-48 md:h-48 md:w-full"
                    src="https://images.unsplash.com/photo-1725714355442-4216013a29fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                    alt="Modern building architecture"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-[var(--heading-color)] font-semibold">
                    Deposit money
                  </div>
                  <Link
                    to={"/login"}
                    className="block mt-1 text-lg leading-tight font-medium text-[var(--text-color)] hover:underline hover:text-[var(--heading-color)]"
                  >
                    Incredible accommodation for your deposit
                  </Link>
                  <p className="mt-2 text-[--para-color]">
                    When you are depositor in our bank you are gain the money of
                    profit and insurance also keep deposit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
