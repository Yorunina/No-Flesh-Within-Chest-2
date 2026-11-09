// priority: 3000

/**
 * 记录单条策略的普通错误；事件中断通过 Java 重抛，保留 KubeJS 的结果。
 * 仅由执行模型的策略调用边界使用，不用于初始化、收尾或属性提交。
 * @param {*} err Rhino 捕获的错误
 * @param {string} eventId
 * @param {string} strategyName 策略函数名或效果 ID
 */
function HandleStrategyError(err, eventId, strategyName) {
    let cause = err && err.javaException ? err.javaException : err
    while (cause instanceof $RhinoWrappedException) {
        cause = cause.getWrappedException()
    }
    if (cause instanceof $KubeJSEventExit) {
        // JS throw 会变成 JavaScriptException；由 Rhino 的 Java 方法重抛才能保留 EventExit。
        $RhinoContext.throwAsScriptRuntimeEx(cause, null)
    }
    let message = '[Strategy] ' + eventId + ' / ' + (strategyName || '<anonymous>')
    if (err && err.rhinoException) {
        console.error(message, err.rhinoException)
    } else {
        // JS 允许抛出无原型对象；日志格式化不能因此再次报错。
        let detail = err != null && typeof err.toString != 'function'
            ? Object.prototype.toString.call(err) : String(err)
        console.error(message + ': ' + detail + (err && err.stack ? '\n' + err.stack : ''))
    }
}
