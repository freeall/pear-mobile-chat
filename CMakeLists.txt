cmake_minimum_required(VERSION 3.25)

project(
  bare_bindings
  LANGUAGES C CXX
)

include(bare)

bare_target(target)

add_subdirectory(vendor/bare EXCLUDE_FROM_ALL)

add_bare_bundle(
  ENTRY src/worker/index.js
  OUT bare/bundle.js.h
  CONFIG bare/bundle.config.js
)

add_library(
  bare_bindings
  STATIC
  bare/bare-bindings.cc
  bare/bundle.js.h
)

set_target_properties(
  bare_bindings
  PROPERTIES
  C_STANDARD 11
  CXX_STANDARD 20
  POSITION_INDEPENDENT_CODE ON
)

target_include_directories(
  bare_bindings
  PRIVATE
  $<TARGET_PROPERTY:bare,INTERFACE_INCLUDE_DIRECTORIES>
  vendor/concurrentqueue
)

target_link_libraries(
  bare_bindings
  PRIVATE
  $<LINK_LIBRARY:WHOLE_ARCHIVE,bare_static>
)

# add native addons objects to the library
if(target MATCHES "ios" OR target MATCHES "android")
  link_bare_module(bare_bindings bare-pipe)
  link_bare_module(bare_bindings bare-tty)
endif()

if(target MATCHES "android")
  set(artefacts android/${CMAKE_ANDROID_ARCH_ABI})
endif()

if(target MATCHES "ios")
  if(target MATCHES "simulator")
    set(artefacts ios/iphonesimulator)
  else()
    set(artefacts ios/iphoneos)
  endif()
endif()

if(DEFINED artefacts)
install(
  FILES
  $<TARGET_FILE:bare_bindings>
  $<TARGET_FILE:bare_static>
  ${v8}
  ${js}
  DESTINATION ${artefacts}
)
install(
  FILES
  ${c++}
  DESTINATION ${artefacts}/misc
)
endif()
