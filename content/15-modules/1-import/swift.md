`import` pulls in a whole module; files in the same module see each other automatically.

```swift
import Foundation            // whole module — no per-name imports
import struct SwiftUI.Text   // narrow to one declaration (rare)

// dependencies come from Swift Package Manager
```
