import React, { useState } from "react";

interface NoteItem {
  id: number;
  title: string;
  category: "Work" | "Personal" | "Math" | "Idea";
  content: string;
  checklist: { id: number; text: string; done: boolean }[];
  date: string;
}

export default function EditorPlayground() {
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 1,
      title: "Competitor Branding Audit",
      category: "Work",
      content: "Ensure proper navigation drawers are configured. Whitepace uses Midnight Navy #043873 and Sunset Yellow #FFE492, which are verified visually against modern aesthetic palettes.",
      checklist: [
        { id: 11, text: "Check drawer color contrasts", done: true },
        { id: 12, text: "Verify typography weight alignments", done: false },
      ],
      date: "Jun 7, 2026",
    },
    {
      id: 2,
      title: "Pythagorean Equation Note",
      category: "Math",
      content: "Formulas and structural layout details must reflect high mathematical precision directly inside elements: hypotenuse formula is c = \\sqrt{a^2 + b^2}. Checked for variables 3 and 4 (yielding 5.00).",
      checklist: [],
      date: "Jun 6, 2026",
    },
    {
      id: 3,
      title: "Brainstorm: Collaborative Loops",
      category: "Idea",
      content: "Let clients simulate editing on the fly so they can see typing loops in action.",
      checklist: [
        { id: 31, text: "Draft live typewriter typing simulator", done: true },
        { id: 32, text: "Enable export data standard backup button", done: true },
      ],
      date: "Jun 5, 2026",
    }
  ]);

  // Current selected or active note being edited
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Editor states
  const [currentTitle, setCurrentTitle] = useState<string>(notes[0].title);
  const [currentCategory, setCurrentCategory] = useState<"Work" | "Personal" | "Math" | "Idea">(notes[0].category);
  const [currentContent, setCurrentContent] = useState<string>(notes[0].content);
  const [currentChecklist, setCurrentChecklist] = useState<{ id: number; text: string; done: boolean }[]>(notes[0].checklist);
  const [newCheckItem, setNewCheckItem] = useState<string>("");

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // AI helper states
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiTip, setAiTip] = useState("");

  const handleSelectNote = (index: number) => {
    // Save current active notes first
    const updated = [...notes];
    updated[activeIndex] = {
      ...updated[activeIndex],
      title: currentTitle,
      category: currentCategory,
      content: currentContent,
      checklist: currentChecklist,
    };
    setNotes(updated);

    // Switch to new active note
    setActiveIndex(index);
    setCurrentTitle(updated[index].title);
    setCurrentCategory(updated[index].category);
    setCurrentContent(updated[index].content);
    setCurrentChecklist(updated[index].checklist);
    setAiTip("");
  };

  const handleCreateNewNote = () => {
    // Save current active first
    const updated = [...notes];
    updated[activeIndex] = {
      ...updated[activeIndex],
      title: currentTitle,
      category: currentCategory,
      content: currentContent,
      checklist: currentChecklist,
    };

    const newNote: NoteItem = {
      id: Date.now(),
      title: "Untitled Slate Note",
      category: "Idea",
      content: "Introduce your layout details, format code blocks, or solve math calculations...",
      checklist: [],
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    const newList = [...updated, newNote];
    setNotes(newList);
    setActiveIndex(newList.length - 1);
    setCurrentTitle(newNote.title);
    setCurrentCategory(newNote.category);
    setCurrentContent(newNote.content);
    setCurrentChecklist(newNote.checklist);
    setAiTip("");
  };

  const handleSaveWorkspaceItem = () => {
    const updated = [...notes];
    updated[activeIndex] = {
      ...updated[activeIndex],
      title: currentTitle,
      category: currentCategory,
      content: currentContent,
      checklist: currentChecklist,
    };
    setNotes(updated);
    alert("📝 Note saved securely inside your browser's workspace!");
  };

  const handleAddTodoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newCheckItem.trim(),
      done: false,
    };
    setCurrentChecklist([...currentChecklist, newItem]);
    setNewCheckItem("");
  };

  const handleToggleTodo = (todoId: number) => {
    setCurrentChecklist(
      currentChecklist.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleApplyFormatting = (type: "bold" | "italic" | "highlight" | "code") => {
    if (type === "bold") {
      setCurrentContent(currentContent + " **BOLD TEXT**");
    } else if (type === "italic") {
      setCurrentContent(currentContent + " *ITALIC TEXT*");
    } else if (type === "highlight") {
      setCurrentContent(currentContent + " ==HIGHLIGHTED TEXT==");
    } else {
      setCurrentContent(currentContent + " `console.log('styled block');`");
    }
  };

  // Simulated AI Expansion Engine
  const triggerAiExpansion = () => {
    setIsAiLoading(true);
    setAiTip("AI is parsing draft parameters...");
    setTimeout(() => {
      let structures = {
        Work: `💡 [AI Suggestion - Meeting Framework]
1. Objectives: Outline core goals.
2. Deliverables Checklist:
   - [ ] Finalize visual mockups
   - [ ] Audit Bootstrap columns layout
3. Next Steps: Assign dates to Sarah & Alex.`,
        Math: `💡 [AI Suggestion - Variable Logic]
- Equation detected: standard quadratic scale.
- Plot coordinates systematically to double check.
- Verification threshold: 100% matched.`,
        Idea: `💡 [AI Suggestion - Roadmap Draft]
- Scope Outline: Set target timeline parameters.
- Milestones: Design standard, responsive test plans.
- Launch: Release standard static layout templates.`,
        Personal: `💡 [AI Suggestion - Daily Focus tracker]
- Morning review: Compile top three focal tasks.
- Interval logs: Log completion status every two hours.
- Evening report: Export backup data.`,
      };

      setAiTip(structures[currentCategory]);
      setIsAiLoading(false);
    }, 700);
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-5" style={{ backgroundColor: "#fafbfc", paddingBottom: "100px !important" }} id="playground">
      <div className="container">
        {/* Component Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="mono-font text-xs text-whitepace-blue fw-bold text-uppercase tracking-wider d-block mb-3">
            🎨 Interactive Workspace
          </span>
          <h2 className="display-5 fw-bold text-whitepace-navy mb-3">
            Productivity Playground
          </h2>
          <p className="text-secondary leading-relaxed px-5">
            Experience Whitepace yourself! Right inside this landing page, draft rich notes, toggling categories, format tags, manage checklists, or generate AI outline frameworks.
          </p>
        </div>

        {/* Dynamic Sandbox Panel Drawer */}
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">
          <div className="row g-0">
            {/* Playground Sidebar Left Block */}
            <div className="col-lg-4 bg-light border-end">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold text-whitepace-navy mb-0">My Notebook</h6>
                  <button 
                    onClick={handleCreateNewNote}
                    className="btn btn-sm btn-whitepace-primary text-xs py-1 px-2 d-flex align-items-center gap-1"
                    id="playground-add-note"
                  >
                    <i className="bi bi-plus-lg"></i> New Note
                  </button>
                </div>

                {/* Search notes bar */}
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="bi bi-search"></i>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search drafts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control border-start-0 text-xs"
                    id="notes-search-input"
                  />
                </div>

                {/* Vertical scroll list of active notes drafts */}
                <div className="d-flex flex-column gap-2 overflow-y-auto pr-1" style={{ maxHeight: "310px" }}>
                  {filteredNotes.length === 0 ? (
                    <div className="text-center py-4">
                      <span className="text-muted text-xs d-block mb-1">No notes found</span>
                      <button onClick={() => setSearchQuery("")} className="btn btn-link text-xxs p-0">Clear filter</button>
                    </div>
                  ) : (
                    filteredNotes.map((note) => {
                      // Find real index in original notes list
                      const origIndex = notes.findIndex((item) => item.id === note.id);
                      const isSelected = origIndex === activeIndex;

                      return (
                        <div 
                          key={note.id}
                          onClick={() => handleSelectNote(origIndex)}
                          className={`card p-3 border border-1 text-start rounded-3 transition-all cursor-pointer ${
                            isSelected 
                              ? "border-primary bg-primary bg-opacity-5 h-100 shadow-sm" 
                              : "border-light bg-white"
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <span className="fw-bold text-xs text-dark text-truncate pr-2" style={{ maxWidth: "160px" }}>{note.title}</span>
                            <span className={`badge ${
                              note.category === "Work" ? "bg-primary" :
                              note.category === "Math" ? "bg-danger" :
                              note.category === "Idea" ? "bg-warning text-dark" : "bg-success"
                            } text-xxs`} style={{ fontSize: "9px" }}>{note.category}</span>
                          </div>
                          <p className="text-muted text-xxs mb-2 text-truncate-2 lines-clamp" style={{ fontSize: "11px", height: "30px", overflow: "hidden" }}>{note.content}</p>
                          <div className="d-flex justify-content-between align-items-center text-xxs" style={{ fontSize: "10px" }}>
                            <span className="text-muted">{note.date}</span>
                            {note.checklist.length > 0 && (
                              <span className="text-primary fw-medium">
                                <i className="bi bi-list-check"></i> {note.checklist.filter(c => c.done).length}/{note.checklist.length} Completed
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Playground Editor Right Block */}
            <div className="col-lg-8">
              <div className="p-4 d-flex flex-column h-100 justify-content-between" style={{ minHeight: "440px" }}>
                <div>
                  {/* Editor Category & title header row */}
                  <div className="row g-2 mb-3">
                    <div className="col-md-8">
                      <input 
                        type="text" 
                        value={currentTitle} 
                        onChange={(e) => setCurrentTitle(e.target.value)}
                        className="form-control form-control-lg border-0 fw-bold px-0 text-whitepace-navy shadow-none"
                        style={{ fontSize: "1.45rem" }}
                        id="editor-title-field"
                      />
                    </div>
                    <div className="col-md-4 text-md-end">
                      <select 
                        value={currentCategory}
                        onChange={(e) => setCurrentCategory(e.target.value as any)}
                        className="form-select form-select-sm d-inline-block border-light text-xs py-1.5"
                        style={{ width: "auto" }}
                        id="editor-category-selector"
                      >
                        <option value="Work">Category: Work</option>
                        <option value="Math">Category: Math</option>
                        <option value="Idea">Category: Idea</option>
                        <option value="Personal">Category: Personal</option>
                      </select>
                    </div>
                  </div>

                  {/* Formatting Toolbar panel */}
                  <div className="bg-light p-2 rounded-3 d-flex flex-wrap gap-1 mb-3 border align-items-center justify-content-between">
                    <div className="d-flex gap-1">
                      <button onClick={() => handleApplyFormatting("bold")} className="btn btn-xs btn-white py-1 px-2.5 border text-xs" title="Bold Text">
                        <i className="bi bi-type-bold"></i>
                      </button>
                      <button onClick={() => handleApplyFormatting("italic")} className="btn btn-xs btn-white py-1 px-2.5 border text-xs" title="Italic Text">
                        <i className="bi bi-type-italic"></i>
                      </button>
                      <button onClick={() => handleApplyFormatting("highlight")} className="btn btn-xs btn-white py-1 px-2.5 border text-xs" title="Highlight Text">
                        <i className="bi bi-pen"></i>
                      </button>
                      <button onClick={() => handleApplyFormatting("code")} className="btn btn-xs btn-white py-1 px-2.5 border text-xs font-mono" style={{ fontSize: "11px" }} title="Code Snippet">
                        <code>{"</>"}</code>
                      </button>
                    </div>

                    {/* AI outline helper trigger */}
                    <button 
                      onClick={triggerAiExpansion}
                      className="btn btn-xs btn-dark py-1 px-3 fs-3 d-flex align-items-center gap-1.5 text-xs text-white bg-dark border-0 rounded"
                      style={{ background: "linear-gradient(135deg, #043873 0%, #4F9CF9 100%)" }}
                      disabled={isAiLoading}
                      id="ai-expand-btn"
                    >
                      <i className="bi bi-stars text-whitepace-yellow"></i>
                      {isAiLoading ? "Processing..." : "AI Outline Expansion"}
                    </button>
                  </div>

                  {/* Draft description text field */}
                  <div className="mb-3">
                    <textarea 
                      rows={5}
                      value={currentContent}
                      onChange={(e) => setCurrentContent(e.target.value)}
                      className="form-control border-0 p-0 shadow-none text-xs text-secondary leading-relaxed"
                      style={{ resize: "none", minHeight: "120px" }}
                      placeholder="Type your outline, format code blocks, or solve math calculations..."
                      id="editor-body-field"
                    />
                  </div>

                  {/* Checklist and AI tip results */}
                  <div className="row g-3 mt-1.5">
                    {/* Checklist Col */}
                    <div className="col-md-6 mb-3">
                      <h6 className="fw-bold text-xs text-secondary mb-2 d-flex align-items-center gap-1.5">
                        <i className="bi bi-check2-square text-primary"></i> Checklist items
                      </h6>

                      <ul className="list-unstyled d-flex flex-column gap-2 mb-2">
                        {currentChecklist.length === 0 ? (
                          <li className="text-muted text-xxs italic py-1">No checklist items formulated yet.</li>
                        ) : (
                          currentChecklist.map((todo) => (
                            <li key={todo.id} className="d-flex align-items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={todo.done}
                                onChange={() => handleToggleTodo(todo.id)}
                                className="form-check-input mt-0 text-xs"
                                style={{ width: "13px", height: "13px" }}
                                id={`todo-box-${todo.id}`}
                              />
                              <span className={`text-xxs fw-medium ${todo.done ? "text-decoration-line-through text-muted" : "text-dark"}`} style={{ fontSize: "11px" }}>
                                {todo.text}
                              </span>
                            </li>
                          ))
                        )}
                      </ul>

                      {/* Add Checklist inline form */}
                      <form onSubmit={handleAddTodoItem} className="input-group input-group-sm max-w-sm mt-3">
                        <input 
                          type="text" 
                          placeholder="Add list task..." 
                          value={newCheckItem}
                          onChange={(e) => setNewCheckItem(e.target.value)}
                          className="form-control text-xxs"
                          id="todo-add-input"
                        />
                        <button type="submit" className="btn btn-whitepace-primary text-xxs py-1" id="todo-add-btn">
                          Add
                        </button>
                      </form>
                    </div>

                    {/* AI Expand Tip Col */}
                    <div className="col-md-6 mb-3 border-start-md">
                      <h6 className="fw-bold text-xs text-secondary mb-2 d-flex align-items-center gap-1.5 ps-md-3">
                        <i className="bi bi-stars text-primary"></i> AI Assistant
                      </h6>
                      <div className="ps-md-3">
                        {aiTip ? (
                          <div className="bg-success bg-opacity-5 p-3 rounded-3 border border-success border-opacity-20">
                            <pre className="text-secondary mb-0 text-xxs font-sans whitespace-pre-wrap leading-relaxed" style={{ fontSize: "11px" }}>
                              {aiTip}
                            </pre>
                          </div>
                        ) : (
                          <div className="bg-light p-3 rounded-3 text-center border">
                            <i className="bi bi-sparkles text-muted fs-5 d-block mb-1"></i>
                            <span className="text-muted d-block text-xxs px-2">Click 'AI Outline Expansion' above to auto-formulate layout deliverables specs.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editor Action buttons footer */}
                <div className="border-top pt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <span className="text-muted text-xxs"><i className="bi bi-clock"></i> Edited {notes[activeIndex].date}</span>
                  <div className="d-flex gap-2">
                    <button 
                      onClick={handleSaveWorkspaceItem}
                      className="btn btn-sm btn-whitepace-outline-dark text-xs py-2 px-3 fw-bold"
                      id="editor-save-btn"
                    >
                      Save to Local
                    </button>
                    <button 
                      onClick={() => {
                        const compiled = `TITLE: ${currentTitle}\nCATEGORY: ${currentCategory}\nDATE: ${notes[activeIndex].date}\nCONTENT:\n${currentContent}\n\nCHECKLIST:\n${currentChecklist.map(c => `- [${c.done ? 'x' : ' '}] ${c.text}`).join('\n')}`;
                        const blob = new Blob([compiled], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `${currentTitle.replace(/\s+/g, '_').toLowerCase()}_draft.txt`;
                        link.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="btn btn-sm btn-whitepace-primary text-xs py-2 px-4 font-bold"
                      id="editor-export-btn"
                    >
                      Export Doc (.txt)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
