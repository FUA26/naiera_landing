# Accessibility Widget Fix & N8n Chat UI Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the AccessibilityWidget not rendering and enhance the N8nChatWidget with new features (timestamps, message status, connection indicator, clear chat).

**Architecture:**
- Fix AccessibilityWidget mounting/hydration issue with suppressHydrationWarning
- Reposition N8nChatWidget to left side to avoid overlap (a11y on right, chat on left)
- Add message timestamps, delivery status, connection status indicator, and clear chat functionality
- Use localStorage for chat history persistence

**Tech Stack:** React 19, Next.js 15, TypeScript, Tailwind CSS 4, next-intl, Lucide icons

---

## Task 1: Fix AccessibilityWidget Not Rendering

**Files:**
- Modify: `components/shared/accessibility-widget.tsx:166-170`

**Step 1: Add suppressHydrationWarning to fix hydration mismatch**

Open `components/shared/accessibility-widget.tsx` and modify the return statement root div:

```tsx
// Line ~169, add suppressHydrationWarning to the root div
return (
  <div className="a11y-widget-root" suppressHydrationWarning>
    {/* Floating Trigger Button */}
    <button
```

**Step 2: Verify the widget renders**

Run: `pnpm dev`
Navigate to http://localhost:3000
Expected: Purple accessibility button visible in bottom-right corner

**Step 3: Commit**

```bash
git add components/shared/accessibility-widget.tsx
git commit -m "fix: add suppressHydrationWarning to AccessibilityWidget

Prevents React hydration mismatch that was preventing widget from rendering"
```

---

## Task 2: Add Translations for New Chat Features

**Files:**
- Modify: `messages/id.json`
- Modify: `messages/en.json`

**Step 1: Add Indonesian translations**

Add to `messages/id.json` in the root level (find the right position alphabetically):

```json
"Chat": {
  "online": "Online",
  "offline": "Offline",
  "connecting": "Menghubungkan...",
  "clearChat": "Hapus Pesan",
  "clearConfirm": "Apakah Anda yakin ingin menghapus semua pesan?",
  "clearConfirmTitle": "Hapus Pesan",
  "cancel": "Batal",
  "justNow": "baru saja",
  "sent": "terkirim",
  "error": "gagal"
},
```

**Step 2: Add English translations**

Add to `messages/en.json` in the root level:

```json
"Chat": {
  "online": "Online",
  "offline": "Offline",
  "connecting": "Connecting...",
  "clearChat": "Clear Chat",
  "clearConfirm": "Are you sure you want to clear all messages?",
  "clearConfirmTitle": "Clear Chat",
  "cancel": "Cancel",
  "justNow": "just now",
  "sent": "sent",
  "error": "failed"
},
```

**Step 3: Verify translations compile**

Run: `pnpm type-check`
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add messages/id.json messages/en.json
git commit -m "i18n: add translations for chat widget new features

- Add online/offline/connecting status
- Add clear chat confirmation dialog
- Add message status labels"
```

---

## Task 3: Update Message Interface with Status

**Files:**
- Modify: `components/shared/n8n-chat.tsx:39-43`

**Step 1: Extend Message interface**

Replace the existing Message interface with:

```tsx
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  status?: "sent" | "delivered" | "error";
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm type-check`
Expected: No errors (existing messages will have optional status)

**Step 3: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add status field to Message interface

Prepares for delivery status indicators on user messages"
```

---

## Task 4: Reposition Chat Widget to Left Side

**Files:**
- Modify: `components/shared/n8n-chat.tsx:136-156` (floating button)
- Modify: `components/shared/n8n-chat.tsx:159-165` (chat window)

**Step 1: Update floating button position**

Change the floating button from `right-6` to `left-6`:

```tsx
{/* Floating Button */}
{!isOpen && (
  <Button
    onClick={() => setIsOpen(true)}
    className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg"
    size="icon"
  >
```

**Step 2: Update chat window position**

Change the chat window position:

```tsx
{/* Chat Window */}
{isOpen && (
  <Card
    className={`fixed z-50 shadow-2xl transition-all duration-300 ${
      isMinimized
        ? "bottom-6 left-6 h-14 w-80"
        : "bottom-6 left-6 h-[500px] w-80 md:w-96"
    }`}
  >
```

**Step 3: Verify positioning**

Run: `pnpm dev`
Expected:
- Accessibility button on bottom-right
- Chat button on bottom-left

**Step 4: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "fix(chat): move widget to left side to avoid overlap

Accessibility widget stays on right, chat widget now on left"
```

---

## Task 5: Add Connection Status State

**Files:**
- Modify: `components/shared/n8n-chat.tsx:55`

**Step 1: Add connection status state**

Add new state after existing states:

```tsx
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "connecting">("online");
  const scrollRef = useRef<HTMLDivElement>(null);
```

**Step 2: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add connection status state

Prepares for showing online/offline/connecting indicator"
```

---

## Task 6: Add Timestamp Formatting Utility

**Files:**
- Modify: `components/shared/n8n-chat.tsx` (add function inside component)

**Step 1: Add formatTime function**

Add after the interfaces (before the component function):

```tsx
function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "baru saja";
  if (diffMins < 60) return `${diffMins}m`;

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
```

**Step 2: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add timestamp formatting utility

Shows 'baru saja' for recent messages, minutes for older, or HH:MM"
```

---

## Task 7: Update sendMessage with Status

**Files:**
- Modify: `components/shared/n8n-chat.tsx:71-123`

**Step 1: Update sendMessage to include status and connection state**

Replace the sendMessage function with:

```tsx
  const sendMessage = async () => {
    if (!input.trim() || !url || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setConnectionStatus("connecting");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: userMessage.content,
          sessionId: sessionId.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update user message status to delivered
      setMessages((prev) =>
        prev.map((msg) =>
          msg === userMessage ? { ...msg, status: "delivered" as const } : msg
        )
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: data.output || data.message || data.text || JSON.stringify(data) || "Terima kasih atas pesan Anda.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConnectionStatus("online");
    } catch (error) {
      console.error("Error sending message:", error);

      // Update user message status to error
      setMessages((prev) =>
        prev.map((msg) =>
          msg === userMessage ? { ...msg, status: "error" as const } : msg
        )
      );

      const errorMessage: Message = {
        role: "system",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setConnectionStatus("offline");
    } finally {
      setIsLoading(false);
    }
  };
```

**Step 2: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): update message status based on API response

- Set status to 'sent' when message is sent
- Update to 'delivered' on successful response
- Update to 'error' on failure
- Update connection status accordingly"
```

---

## Task 8: Add Connection Status Indicator to Header

**Files:**
- Modify: `components/shared/n8n-chat.tsx` (imports)
- Modify: `components/shared/n8n-chat.tsx:167-215` (header section)

**Step 1: Add CircleDot icon to imports**

Update the imports to include CircleDot:

```tsx
import { Minimize2, Maximize2, X, Send, CircleDot } from "lucide-react";
```

**Step 2: Update header to include connection status**

Replace the header section with:

```tsx
          {/* Header */}
          <CardHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary-foreground"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">{title}</CardTitle>
                  {!isMinimized && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CircleDot
                        className={cn(
                          "h-2.5 w-2.5",
                          connectionStatus === "online" && "text-green-500",
                          connectionStatus === "connecting" && "text-yellow-500 animate-pulse",
                          connectionStatus === "offline" && "text-red-500"
                        )}
                      />
                      <span>
                        {connectionStatus === "online" && "Online"}
                        {connectionStatus === "connecting" && "Menghubungkan..."}
                        {connectionStatus === "offline" && "Offline"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
```

**Step 3: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add connection status indicator to header

Shows colored dot (green/yellow/red) and text status
- Green: Online
- Yellow (pulsing): Connecting
- Red: Offline"
```

---

## Task 9: Update Message Rendering with Timestamps and Status

**Files:**
- Modify: `components/shared/n8n-chat.tsx` (imports)
- Modify: `components/shared/n8n-chat.tsx:230-261` (messages section)
- Modify: `components/shared/n8n-chat.tsx` (add Check, AlertCircle icons)

**Step 1: Add Check and AlertCircle to imports**

Update the imports:

```tsx
import { Minimize2, Maximize2, X, Send, CircleDot, Check, AlertCircle, Trash2 } from "lucide-react";
```

**Step 2: Update message rendering to show timestamps and status**

Replace the messages mapping section with:

```tsx
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex flex-col ${
                          message.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : message.role === "system"
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-[10px] text-muted-foreground ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {message.role === "user" && message.status && (
                            <span className="flex items-center">
                              {message.status === "sent" && <Check className="h-3 w-3 opacity-60" />}
                              {message.status === "delivered" && (
                                <div className="relative">
                                  <Check className="h-3 w-3 opacity-60" />
                                  <Check className="h-3 w-3 opacity-60 absolute -top-0.5 -left-0.5" />
                                </div>
                              )}
                              {message.status === "error" && <AlertCircle className="h-3 w-3 text-destructive" />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
```

**Step 3: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add timestamps and message status indicators

- Shows HH:MM or relative time below each message
- User messages show delivery status (single/double checkmark or error icon)
- Aligns timestamp appropriately for user/assistant messages"
```

---

## Task 10: Add Clear Chat Functionality

**Files:**
- Modify: `components/shared/n8n-chat.tsx` (imports already have Trash2)
- Modify: `components/shared/n8n-chat.tsx` (add clearChat function)
- Modify: `components/shared/n8n-chat.tsx:264-290` (input section)
- Modify: `components/shared/n8n-chat.tsx` (imports - add Dialog components)

**Step 1: Add Dialog imports**

Add to existing imports:

```tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
```

**Step 2: Add clearChat state and function**

Add after existing states:

```tsx
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "connecting">("online");
  const [showClearDialog, setShowClearDialog] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
```

Add the clearChat function:

```tsx
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowClearDialog(false);
  };
```

**Step 3: Update input section to include clear button**

Replace the CardFooter section with:

```tsx
              {/* Input */}
              <CardFooter className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex w-full gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  {messages.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowClearDialog(true)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </form>
              </CardFooter>
```

**Step 4: Add confirmation dialog at end of component**

Add before the final closing tags:

```tsx
      {/* Clear Chat Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Pesan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus semua pesan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={clearChat}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

**Step 5: Commit**

```bash
git add components/shared/n8n-chat.tsx
git commit -m "feat(chat): add clear chat functionality

- Adds trash icon button when messages exist
- Shows confirmation dialog before clearing
- Uses Dialog component for confirmation UI"
```

---

## Task 11: Verify All Features Work

**Files:**
- All modified files

**Step 1: Run type check**

Run: `pnpm type-check`
Expected: No TypeScript errors

**Step 2: Run linter**

Run: `pnpm lint`
Expected: No ESLint errors

**Step 3: Manual testing checklist**

Run: `pnpm dev`

Test each feature:
- [ ] Accessibility widget visible on bottom-right
- [ ] Click accessibility button - panel opens
- [ ] Chat widget visible on bottom-left
- [ ] Click chat button - panel opens
- [ ] Both widgets don't overlap
- [ ] Send a message - see timestamp
- [ ] Send a message - see "sent" status (single check)
- [ ] Receive response - status changes to "delivered" (double check)
- [ ] Connection status shows "Online" (green dot)
- [ ] Click trash icon - confirmation dialog appears
- [ ] Confirm clear - messages are cleared
- [ ] After clearing, trash icon disappears

**Step 4: Final commit if any adjustments needed**

```bash
git add .
git commit -m "fix: minor adjustments from testing"
```

---

## Summary of Changes

| Task | Description | Files Modified |
|------|-------------|----------------|
| 1 | Fix AccessibilityWidget hydration | `accessibility-widget.tsx` |
| 2 | Add translations | `id.json`, `en.json` |
| 3 | Extend Message interface | `n8n-chat.tsx` |
| 4 | Reposition chat to left | `n8n-chat.tsx` |
| 5 | Add connection state | `n8n-chat.tsx` |
| 6 | Add timestamp utility | `n8n-chat.tsx` |
| 7 | Update sendMessage with status | `n8n-chat.tsx` |
| 8 | Add connection indicator UI | `n8n-chat.tsx` |
| 9 | Add timestamps and status UI | `n8n-chat.tsx` |
| 10 | Add clear chat feature | `n8n-chat.tsx` |
| 11 | Verify and test | All |

---

## Testing Commands

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Development server
pnpm dev

# Build (to ensure production works)
pnpm build
```
