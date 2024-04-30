package to.holepunch.hellopear;

import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;

public final class BareBindings {
  static {
    try {
      System.loadLibrary("bare_bindings_jsi");
    } catch (Exception ignored) {
    }
  }

  /** @noinspection JavaJniMissingFunction*/
  static native void install(
    long jsi,
    CallInvokerHolderImpl callInvoker);
}
