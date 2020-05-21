Attribute VB_Name = "Module1"

Sub publish_dataset()
    Dim objShell As Object
    Dim pythonExe, pythonScript As String
    
    Set objShell = VBA.CreateObject("Wscript.Shell")
    
    python_exe = """D:\Tools\python3.7\python.exe"""
    python_script = """D:\Users\manoj\GDrive\matatika\sample\publish-dataset.py"""
    excel_filepath = Application.ActiveWorkbook.FullName
    
    result = objShell.Run(python_exe & python_script & " " & excel_filepath & " " & ActiveSheet.Name)
End Sub
