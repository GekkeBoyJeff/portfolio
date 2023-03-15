import { getRandomQuote } from "./quotes";

// change the h2 of the first section to a random quote
const quote = document.querySelector('.background blockquote p') as HTMLHeadingElement;
if (quote) {
    quote.insertAdjacentHTML(`afterbegin`, getRandomQuote());
}