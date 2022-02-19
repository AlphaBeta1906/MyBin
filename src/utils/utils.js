function connectionError(err) {
    return err.toJSON().message === "Network Error"
}

export { connectionError }