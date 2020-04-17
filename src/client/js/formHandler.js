export const handleSubmit = event => {
    event.preventDefault();

    const formUrlElementValue = event.target.elements[0].value;

    const polarityElement = document.getElementById("polarity");
    const subjectivityElement = document.getElementById("subjectivity");
    const polarityConfidenceElement = document.getElementById(
        "polarity_confidence"
    );
    const subjectivityConfidenceElement = document.getElementById(
        "subjectivity_confidence"
    );
    const textElement = document.getElementById("text");
    const loadingElement = document.getElementById("loading");
    const resultsElement = document.getElementById("results");
    const errorElement = document.getElementById("error");

    // URL validation.
    const errorMessage = Client.validateURL(formUrlElementValue);
    if (errorMessage) {
        errorElement.innerHTML = errorMessage;
        window.setTimeout(() => (errorElement.innerHTML = ""), 2000);
        return;
    }

    // Display Loading text after form submission.
    loadingElement.innerHTML = "...Loading...";

    function handleErrors(response) {
        debugger;
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    debugger;
    fetch("http://localhost:8081/article", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: formUrlElementValue })
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            debugger;
            const {
                polarity,
                subjectivity,
                polarity_confidence,
                subjectivity_confidence,
                text
            } = res;
            debugger;

            // Hide loading, and show results section.
            loadingElement.style.display = "none";
            resultsElement.style.display = "block";

            // Modify DOM elements with response values.
            polarityElement.innerHTML = polarity;
            subjectivityElement.innerHTML = subjectivity;
            polarityConfidenceElement.innerHTML = polarity_confidence;
            subjectivityConfidenceElement.innerHTML = subjectivity_confidence;
            textElement.innerHTML = text;
            textElement.setAttribute("cite", formUrlElementValue);
        }).catch(x => {
            loadingElement.innerHTML = "Error - "+ x;
            loadingElement.style.display = "block";
            resultsElement.style.display = "none";
            console.log(x);
            debugger;
        });

   
};
