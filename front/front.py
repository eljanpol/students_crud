import tkinter as tk
from tkinter import ttk, Tk


class App(tk.Canvas):
    def __init__(self, master):
        self.pack()
    

if __name__ == "__main__":
    root = Tk()
    root.geometry("1500x800")
    root.mainloop()

    main = App(master=root)
