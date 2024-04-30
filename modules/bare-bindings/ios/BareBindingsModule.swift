import ExpoModulesCore

public class BareBindingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BareBindings")

    Function("install") {
      BareBindings.sharedInstance().install(appContext?.reactBridge)
    }
  }
}
