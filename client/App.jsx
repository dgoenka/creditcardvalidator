import "./App.scss";
import "regenerator-runtime/runtime.js";
import { useMemo, useState, useEffect } from "react";
import useKeyPress from "react-use-keypress";
import { Audio } from "react-loader-spinner";

function useDebouncedEffect(fn, time, deps) {
  const dependencies = [...deps, fn, time];
  useEffect(() => {
    const timeout = setTimeout(fn, time);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);
}
export default function App() {
  const [numberBeingEntered, setNumberEntered] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [querying, setQuerying] = useState(false);

  const handleChange = (e) => {
    if (numberBeingEntered.length < 18) {
      const value = e.key.replace(/\D/g, "");
      setNumberEntered(numberBeingEntered + value);
      setIsValid(null);
    }
  };

  useDebouncedEffect(
    () => {
      if (numberBeingEntered.length === 16) {
        const abortController = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
          console.log(
            "in fetchData, numberBeingEntered is: " + numberBeingEntered,
          );
          try {
            setQuerying(true);
            const raw = JSON.stringify({
              creditCardNumber: numberBeingEntered,
            });
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
              method: "POST",
              body: raw,
              headers: myHeaders,
              signal,
            };
            const { result } = await (
              await fetch(
                "http://localhost:3001/validator/creditcard",
                requestOptions,
              )
            ).json();
            setQuerying(false);
            setIsValid(result);
          } catch (e) {
            setIsValid(null);
          }
        };
        fetchData();
        return () => {
          abortController.abort();
        };
      }
    },
    1000,
    [numberBeingEntered],
  );

  const backspace = (e) => {
    setNumberEntered(
      numberBeingEntered.substring(0, numberBeingEntered.length - 1),
    );
    setIsValid(null);
  };

  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach((key) =>
    useKeyPress(key, handleChange),
  );
  useKeyPress("Backspace", backspace);

  let formattedCreditCardValue = useMemo(() => {
    let strToReturn = "";
    if (numberBeingEntered.length < 1) {
      strToReturn = "⠀";
    } else {
      console.log("numberBeingEntered is: " + numberBeingEntered);
      for (let i = 0; i < numberBeingEntered.length; i++) {
        strToReturn =
          strToReturn +
          numberBeingEntered.charAt(i) +
          ((i + 1) % 4 === 0 ? " " : "");
      }
    }
    return strToReturn;
  }, [numberBeingEntered]);

  return (
    <div className="App">
      <header>
        <h1>Credit Card Validator</h1>
      </header>
      <main>
        Start entering a credit card number below and it will be validated
        automatically upon completion:
        <br />
        <div className={"textInputHolder"}>
          <span
            className={"formatted_credit_card_value"}
            style={{
              ...(numberBeingEntered.length < 1
                ? { color: "transparent" }
                : {}),
            }}
          >
            {formattedCreditCardValue}
          </span>
        </div>
        <br />
        {isValid === true ? (
          "It is a valid credit card number!"
        ) : isValid === false ? (
          "It is an invalid credit card number"
        ) : querying ? (
          <>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
