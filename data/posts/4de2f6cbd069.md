Whether you are an experienced command-liner looking to learn new shortcuts, or you avoid using the terminal because you hate using the arrows to navigate through long commands one character at a time just to change a parameter at the end or the beginning of the line, this article is for you.

I have compiled a list of, what I consider, the most useful keyboard shortcuts you can use in your terminal of choice.

As for the shell, I use [Zsh](https://ohmyz.sh/) but most of, if not all, the shortcuts also apply to [Bash](https://www.gnu.org/software/bash/). And at the end, I also show how you can create your own custom shortcuts!

* * *

## Contents

* * *

## Shell Line Editor

A line editor is a text editor that allows users to edit lines that represent commands. It’s the first part of the shell you probably interacted with, as it handles all the commands you type.

Every shell provides some kind of line editing capabilities, including entering and deleting characters, word navigation, deleting lines, etc.

There are two modes of operation available to the Zsh (and Bash) line editor_,_ one (the default) based on [Emacs](https://www.gnu.org/software/emacs/)_,_ and the other based on [vi](https://www.vim.org/)_._ I recommend starting with Emacs mode, mastering it, and later trying the vi mode.

I won’t get down to the nitty-gritty of how line editors work, if you are interested, you can find more information about [zle (Zsh line editor)](http://zsh.sourceforge.net/Guide/zshguide04.html) and about [Readline](https://www.gnu.org/software/bash/manual/html_node/Command-Line-Editing.html) (used by Bash).

### Switching modes

Although Emacs mode is the default, if you have your `$EDITOR` set to vi (or any editor that contain “vi” such as [vim](https://www.vim.org/)), vi mode will be enabled.

To switch to Emacs mode, run (or add to your `.rc` file):

```
# zsh
bindkey -e

# bash
set -o emacs
```

To switch to vi mode, run (or add to your `.rc` file):

```
# zsh
bindkey -v

# bash
set -o vi
```

To list all the current key bindings, run:

```
# zsh
bindkey

# bash
bind -P
```

Both Zsh and Bash support keymaps, so you can have a different set of key bindings active at different times.

* * *

## Emacs Mode

### Moving the cursor

*   `CTRL-A`/`HOME`: Move to the beginning of a line.
*   `CTRL-E`/`END`: Move to the end of a line.
*   `CTRL-B`/`LEFT`: Move left one character.
*   `CTRL-F`/`RIGHT`: Move right one character.
*   `ALT-B`/`CTRL-LEFT`: Move left one word.
*   `ALT-F`/`CTRL-RIGHT`: Move right one word.
*   `CTRL-XX`: Hold `CTRL` and press `X` twice to move the cursor to the beginning of the line, and hold `CTRL` and press `X` twice again to move the cursor back.

### Editing text

*   `CTRL-U`: Cut all the characters.
*   `CTRL-K`: Cut the characters to the right of the cursor.
*   `CTRL-H`/`BACKSPACE`/`DELETE (MACOS)`: Delete one character to the left.
*   `CTRL-D`/`DELETE`/`FN DELETE (MACOS)`: Delete one character to the right.
*   `CTRL-W`: Cut one word to the left.
*   `ALT-D`: Cut one word to the right.
*   `CTRL-Y`: Paste the characters previously cut.
*   `CTRL-_`: Undo the last edit.
*   `CTRL-XE`: Open the `$EDITOR` to edit the line.
*   `ALT-U`: Change one word to the right to uppercase.
*   `ALT-L`: Change one word to the right to lowercase.

### Command completion

*   `TAB`: Attempt shell expansion on the current word. If that fails, attempt completion.

```
gi<TAB>     # git
ls *<TAB>   # ls folder1 folder2 file3
```

*   `CTRL-G`: List the expansion of the current word.

### Managing the screen

*   `CTRL-L`: Clear screen (just like `clear`).
*   `CTRL-S`: Stop screen output. Useful for preventing processes from spamming the stdout.
*   `CTRL-Q`: Resume screen output.

### **Managing processes**

*   `CTRL-C`: Terminate the foreground process. (Also can be used to delete the whole line.)
*   `CTRL-Z`: Suspend the foreground process (use `fg` and `bg` to resume).
*   `CTRL-D:` Exit shell (just like `exit`).

### Accessing Command History

*   `CTRL-R`: Search the command history. Accept with `ENTER`/`RETURN`, abort with `CTRL-G`.
*   `CTRL-P`/`UP`: The previous command in history.
*   `CTRL-N`/`DOWN`: The next command in history.

* * *

## Vi Mode

Just like any vi-based editor, vi mode operates in either _insert mode_ (keys produce text on the screen) or _normal mode_ (keys represent editing commands)_._

### Commands

To switch to normal mode, press `ESC` or `CTRL-[`, by default, there won’t be any visual indication about which mode is currently active. If you want to switch back to insert mode, just like vi, press `a` (or `A`, `i`, `I`, depending on where you want the cursor to be).

For more commands, see this [cheat sheet](https://vim.rtorr.com/).

So, in vi mode, if you want to delete the whole line, you press `ESC` (to switch to command mode), `dd` (to delete the line), and `a` (to switch back to insert mode).

Depending on your shell, or if you have any plugins, some of the Emacs-based shortcuts might work when in insert mode.

### Why not both?

If you, like me, like both modes, there’s a really good [Zsh plugin](https://github.com/softmoth/zsh-vim-mode) that not only enhances vi mode with more features like mode visual indicator and support for [surround bindings](https://sourceforge.net/p/zsh/code/ci/master/tree/Functions/Zle/surround), but also makes most of the Emacs key bindings available.

* * *

## Custom Keyboard Shortcuts

It’s easy to add your own keyboard shortcuts. If you are not sure what code represents a key combination (e.g `ALT-Z` is _^\[z_), first press `CTRL-V` followed by the key combination.

### Line editor commands

For a list of Zsh-bindable commands, visit [this site](http://zsh.sourceforge.net/Doc/Release/Zsh-Line-Editor.html#Standard-Widgets), for Bash’s, visit [this site](https://www.gnu.org/software/bash/manual/html_node/Bindable-Readline-Commands.html).

For example, to bind `undo` to `ALT-Z`:

```
# zsh
bindkey '^\[z' undo

# bash
bind '"^\[z":undo'
```

### Macros

You can also bind strings:

```
# zsh
bindkey -s '^\[\[24~' 'You\`ve just pressed F12'

# bash
`bind '"\e[24~":"`You\`ve just pressed F12"'
```

### Shell commands

You can also define key bindings to execute shell commands without affecting the current command line.

To bind printing the current directory to `CTRL-P`:

```
# bash
bind -x '"\\C-p":"pwd"'
```

With Zsh, it’s a bit more complicated but way more flexible. The way we achieve that is via [Widgets](http://zsh.sourceforge.net/Guide/zshguide04.html):

Thanks to [Benoît de Chezelles](https://medium.com/u/dbe7934987a2), here’s a better version that shows the result below the command line:

* * *

## Conclusion

Did I miss any useful shortcuts? Let me know.

Thanks for reading — I hope you learned something new today.

Take care and I’ll see you next time.
