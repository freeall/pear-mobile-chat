package to.holepunch.hellopear

import com.facebook.react.bridge.CatalystInstanceImpl
import com.facebook.react.bridge.ReactApplicationContext
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

@Suppress("unused")
class BareBindingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BareBindings")

    Function("install") {
      val reactContext = appContext.reactContext as ReactApplicationContext
      val catalyst = reactContext.catalystInstance as CatalystInstanceImpl

      BareBindings.install(
        reactContext.javaScriptContextHolder!!.get(),
        catalyst.jsCallInvokerHolder)
    }
  }
}
