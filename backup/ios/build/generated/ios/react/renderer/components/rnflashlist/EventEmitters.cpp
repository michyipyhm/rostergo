
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateEventEmitterCpp.js
 */

#include <react/renderer/components/rnflashlist/EventEmitters.h>


namespace facebook::react {

void AutoLayoutViewEventEmitter::onBlankAreaEvent(OnBlankAreaEvent $event) const {
  dispatchEvent("blankAreaEvent", [$event=std::move($event)](jsi::Runtime &runtime) {
    auto $payload = jsi::Object(runtime);
    $payload.setProperty(runtime, "offsetStart", $event.offsetStart);
$payload.setProperty(runtime, "offsetEnd", $event.offsetEnd);
    return $payload;
  });
}


} // namespace facebook::react
