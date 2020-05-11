export default (item) =>
    typeof item === "object" ? JSON.stringify(item) : item;
