// priority: 1000

ContentPacks.getAllSharedForCurrent().forEach((scriptType, shared) => {
    // 显然，获取到的函数和常量需要用 jsdoc 标注一下……
    console.log(scriptType + " " + shared)
    for (let i in shared) {
        console.log("    " + i + " " + shared[i])
        for (let j in shared[i]) {
            console.log("        " + j + " " + shared[i][j])
        }
    }
})