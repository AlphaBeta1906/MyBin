import { useState } from "react"


function useTheme(themeName) {
    // this code is not from me,but someone from discord
    var storedTheme = localStorage.getItem("theme") === null ? "light" : localStorage.getItem("theme")
    const [theme, setTheme] = useState(storedTheme)
    window.addEventListener("storage", ev => {
        if (ev.key === "theme" && (ev.oldValue !== ev.newValue)) {
            switch (ev.newValue) {
                case "dark":
                    setTheme("dark")
                    break;
                default:
                    setTheme("light")
                    break
            }
        }
    })

    function changeTheme(newTheme) {
        window.localStorage.setItem("theme", newTheme);

        // event 'storage' gak nge emit di tab yang sama, jadi harus dispatch manual
        window.dispatchEvent(new StorageEvent("storage", {
            key: "theme",
            newValue: newTheme,
            oldValue: theme,
            storageArea: window.localStorage
        }));
    }

    return [theme, changeTheme];
}

function connectionError(err) {
    return err.toJSON().message === "Network Error"
}

export { connectionError, useTheme }