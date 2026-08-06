import React, { useState } from "react";
import addjobcss from "./addjob.module.css";
import { createJob, updateJob } from "../../services/jobService";
import { toast } from "react-toastify";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const COLOR_OPTS = [
  "#28a745",
  "#dc3545",
  "#007bff",
  "#ff9800",
  "#6c757d",
  "#000000",
];

const STEPS = [
  { label: "Basic Info", icon: "📋" },
  { label: "Important Dates", icon: "📅" },
  { label: "Fee & Age", icon: "💰" },
  { label: "Vacancy", icon: "👥" },
  { label: "Links", icon: "🔗" },
];

// ─── INITIAL STATE ────────────────────────────────────────────────────────────

const initState = () => ({
  isJob: false,
  jobHeading: "",
  isDocument: false,
  documentHeading: "",
  isAdmission: false,
  admissionHeading: "",
  isAnswerKey: false,
  answerKeyHeading: "",
  isResultReleased: false,
  resultHeading: "",
  isAdmitCardReleased: false,
  admitCardHeading: "",
  label: "",
  title: "",
  postDate: "",
  boardName: "",
  postName: "",
  noOfVacancies: "",
  startDate: "",
  endDate: "",
  minAgeLimit: "",
  maxAgeLimit: "",
  ageRefDate: "",
  advertisementNo: "",
  importantDates: [
    { label: "Notification Date", date: "", textColor: "#28a745" },
    { label: "Online Apply Start Date", date: "", textColor: "#dc3545" },
    { label: "Online Apply Last Date", date: "", textColor: "#007bff" },
    { label: "Last Date For Fee Payment", date: "", textColor: "#007bff" },
    { label: "Correction Date", date: "", textColor: "#007bff" },
    { label: "Exam Date", date: "", textColor: "#007bff" },
    { label: "Admit Card", date: "", textColor: "#007bff" },
    { label: "Result Date", date: "", textColor: "#007bff" },
  ],
  applicationFees: [
    { label: "For General, OBC", fee: "" },
    { label: "For SC/ ST/ EBC / Female / Transgender", fee: "" },
  ],
  ageLimits: [
    { label: "Minimum Age", value: "" },
    { label: "Maximum Age", value: "" },
  ],
  postsWithNoVaccancy: [{ PostLevel: "", noVaccancy: "" }],
  postsWithElligibility: [{ PostLevel: "", elligibility: "" }],
  headingLinks: [
    { Level: "Apply Online", Link: "" },
    { Level: "Download Notification", Link: "" },
  ],
});

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const Ico = {
  Train: () => (
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="6" y="12" width="36" height="22" rx="5" fill="white" />
      <rect x="10" y="16" width="10" height="8" rx="2" fill="#ff0000" />
      <rect x="28" y="16" width="10" height="8" rx="2" fill="#ff0000" />
      <rect x="6" y="28" width="36" height="6" fill="#e0e0e0" />
      <circle cx="14" cy="38" r="4" fill="white" />
      <circle cx="34" cy="38" r="4" fill="white" />
      <rect x="22" y="34" width="4" height="8" rx="1" fill="white" />
    </svg>
  ),
  Cal: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM7 2v2h10V2H7z" />
    </svg>
  ),
  Fee: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8h16v10zm-7-5h2v2h-2zm-4 0h2v2H9zm8 0h2v2h-2z" />
    </svg>
  ),
  People: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5zm-1 13l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L17 9l-6 6z" />
    </svg>
  ),
  LinkIc: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M17 7H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10zm0 8H7a3 3 0 0 1 0-6h10a3 3 0 0 1 0 6z" />
    </svg>
  ),
  Apply: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v1H8zm0 2h5v1H8zm0-4h3v1H8z" />
    </svg>
  ),
  Dl: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z" />
    </svg>
  ),
  Person: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  ),
  Edit: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 15, height: 15 }}
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  ),
  Basic: () => (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 16, height: 16 }}
    >
      <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  ),
  Minus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 16, height: 16 }}
    >
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  ),
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div className={addjobcss.field}>
      <label className={addjobcss.label}>{label}</label>
      {children}
    </div>
  );
}

function ColorPicker({ value, onChange }) {
  return (
    <div className={addjobcss.colorRow}>
      {COLOR_OPTS.map((c) => (
        <span
          key={c}
          className={`${addjobcss.colorDot} ${value === c ? addjobcss.colorDotSelected : ""}`}
          style={{
            background: c,
            borderColor: value === c ? "#000" : "transparent",
          }}
          title={c}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function Step1Basic({ data, set }) {
  const u = (k) => (e) => set({ ...data, [k]: e.target.value });
  return (
    <div className={addjobcss.formGrid}>
      <div className={addjobcss.spanFull}>
        <Field label="Is Job?">
          <input
            type="checkbox"
            checked={data.isJob || false}
            onChange={(e) => set({ ...data, isJob: e.target.checked })}
          />
        </Field>

        {/*  Show only when checked */}
        {data.isJob && (
          <Field label="Job Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Job Heading"
              value={data.jobHeading || ""}
              onChange={(e) => set({ ...data, jobHeading: e.target.value })}
            />
          </Field>
        )}
      </div>

      <div className={addjobcss.spanFull}>
        <Field label="Is Document?">
          <input
            type="checkbox"
            checked={data.isDocument || false}
            onChange={(e) => set({ ...data, isDocument: e.target.checked })}
          />
        </Field>

        {data.isDocument && (
          <Field label="Document Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Document Heading"
              value={data.documentHeading || ""}
              onChange={(e) =>
                set({ ...data, documentHeading: e.target.value })
              }
            />
          </Field>
        )}
      </div>

      <div className={addjobcss.spanFull}>
        <Field label="Is Admission?">
          <input
            type="checkbox"
            checked={data.isAdmission || false}
            onChange={(e) => set({ ...data, isAdmission: e.target.checked })}
          />
        </Field>

        {data.isAdmission && (
          <Field label="Admission Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Admission Heading"
              value={data.admissionHeading || ""}
              onChange={(e) =>
                set({ ...data, admissionHeading: e.target.value })
              }
            />
          </Field>
        )}
      </div>
      <div className={addjobcss.spanFull}>
        <Field label="Is Answer Key?">
          <input
            type="checkbox"
            checked={data.isAnswerKey || false}
            onChange={(e) => set({ ...data, isAnswerKey: e.target.checked })}
          />
        </Field>

        {data.isAnswerKey && (
          <Field label="Answer Key Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Answer Key Heading"
              value={data.answerKeyHeading || ""}
              onChange={(e) =>
                set({ ...data, answerKeyHeading: e.target.value })
              }
            />
          </Field>
        )}
      </div>
      <div className={addjobcss.spanFull}>
        <Field label="Is Result Released ?">
          <input
            type="checkbox"
            checked={data.isResultReleased || false}
            onChange={(e) =>
              set({ ...data, isResultReleased: e.target.checked })
            }
          />
        </Field>

        {data.isResultReleased && (
          <Field label="Result Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Result Heading"
              value={data.resultHeading || ""}
              onChange={(e) => set({ ...data, resultHeading: e.target.value })}
            />
          </Field>
        )}
      </div>
      <div className={addjobcss.spanFull}>
        <Field label="Is Admit card Released?">
          <input
            type="checkbox"
            checked={data.isAdmitCardReleased || false}
            onChange={(e) =>
              set({ ...data, isAdmitCardReleased: e.target.checked })
            }
          />
        </Field>

        {data.isAdmitCardReleased && (
          <Field label="Admit Card Heading">
            <input
              className={addjobcss.input}
              placeholder="Enter Admit Card Heading"
              value={data.admitCardHeading || ""}
              onChange={(e) =>
                set({ ...data, admitCardHeading: e.target.value })
              }
            />
          </Field>
        )}
      </div>
      <div className={addjobcss.spanFull}>
        <Field label="Page Label / Tag">
          <input
            className={addjobcss.input}
            placeholder="e.g. Bihar BPSC APO Recruitment 2026"
            value={data.label}
            onChange={u("label")}
          />
        </Field>
      </div>
      <div className={addjobcss.spanFull}>
        <Field label="Job Title">
          <input
            className={addjobcss.input}
            placeholder="e.g. Railway RRB Group D Online Form 2026"
            value={data.title}
            onChange={u("title")}
          />
        </Field>
      </div>
      <Field label="Board Name">
        <input
          className={addjobcss.input}
          placeholder="e.g. Railway Recruitment Boards (RRB)"
          value={data.boardName}
          onChange={u("boardName")}
        />
      </Field>
      <Field label="Advertisement No.">
        <input
          className={addjobcss.input}
          placeholder="e.g. CEN 09/2025"
          value={data.advertisementNo}
          onChange={u("advertisementNo")}
        />
      </Field>
      <div className={addjobcss.spanFull}>
        <Field label="Post Name / Description">
          <textarea
            className={addjobcss.textarea}
            placeholder="e.g. Group-D (Level-1) posts across various railway zones in India"
            value={data.postName}
            onChange={u("postName")}
          />
        </Field>
      </div>
      <Field label="Total Vacancies">
        <input
          className={addjobcss.input}
          type="number"
          placeholder="e.g. 22195"
          value={data.noOfVacancies}
          onChange={u("noOfVacancies")}
        />
      </Field>
      <Field label="Post Date">
        <input
          className={addjobcss.input}
          placeholder="e.g. March 23, 2026 12:35 pm"
          value={data.postDate}
          onChange={u("postDate")}
        />
      </Field>
      <Field label="Application Start Date">
        <input
          className={addjobcss.input}
          placeholder="e.g. 31 January 2026"
          value={data.startDate}
          onChange={u("startDate")}
        />
      </Field>
      <Field label="Application End Date">
        <input
          className={addjobcss.input}
          placeholder="e.g. 9 March 2026 (Extended)"
          value={data.endDate}
          onChange={u("endDate")}
        />
      </Field>
      <Field label="Min Age Limit">
        <input
          className={addjobcss.input}
          type="number"
          placeholder="e.g. 18"
          value={data.minAgeLimit}
          onChange={u("minAgeLimit")}
        />
      </Field>
      <Field label="Max Age Limit">
        <input
          className={addjobcss.input}
          type="number"
          placeholder="e.g. 33"
          value={data.maxAgeLimit}
          onChange={u("maxAgeLimit")}
        />
      </Field>
      <Field label="Age Reference Date">
        <input
          className={addjobcss.input}
          placeholder="e.g. 01 January 2026"
          value={data.ageRefDate}
          onChange={u("ageRefDate")}
        />
      </Field>
      <Field label="Job Link Lebel">
        <input
          className={addjobcss.input}
          placeholder="UPTET Online Form 2026 – Start"
          value={data.jobHeading}
          onChange={u("jobHeading")}
        />
      </Field>
      {/* <Field label="Admit Card Lebel">
        <input
          className={addjobcss.input}
          placeholder="UPPSC LT Grade Assistant Teacher (Computer) Admit Card 2026"
          value={data.admitCardHeader}
          onChange={u("admitCardHeader")}
        />
      </Field>
      <Field label="Is Admit Card Released ?">
        <select
          value={data.isResultReleased}
          onChange={u("isAdmitCardReleased")}
          className={addjobcss.input}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </Field>
      <Field label="Result Lebel">
        <input
          className={addjobcss.input}
          placeholder="UP Police SI, ASI Final Result 2026 – Out"
          value={data.resultHeader}
          onChange={u("resultHeader")}
        />
      </Field>
      <Field label="Is Result Released ?">
        <select
          value={data.isResultReleased}
          onChange={u("isResultReleased")}
          className={addjobcss.input}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </Field> */}
    </div>
  );
}

function Step2Dates({ data, set }) {
  const update = (i, key, val) => {
    const arr = data.importantDates.map((d, idx) =>
      idx === i ? { ...d, [key]: val } : d,
    );
    set({ ...data, importantDates: arr });
  };
  const add = () =>
    set({
      ...data,
      importantDates: [
        ...data.importantDates,
        { label: "", date: "", textColor: "#007bff" },
      ],
    });
  const remove = (i) =>
    set({
      ...data,
      importantDates: data.importantDates.filter((_, idx) => idx !== i),
    });

  return (
    <div className={addjobcss.dynList}>
      {data.importantDates.map((d, i) => (
        <div key={i} className={addjobcss.dynRow}>
          <Field label="Label">
            <input
              className={addjobcss.input}
              placeholder="e.g. Notification Date"
              value={d.label}
              onChange={(e) => update(i, "label", e.target.value)}
            />
          </Field>
          <Field label="Date / Value">
            <input
              className={addjobcss.input}
              placeholder="e.g. 30 January 2026"
              value={d.date}
              onChange={(e) => update(i, "date", e.target.value)}
            />
          </Field>
          <Field label="Color">
            <ColorPicker
              value={d.textColor}
              onChange={(v) => update(i, "textColor", v)}
            />
          </Field>
          <button
            className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
            onClick={() => remove(i)}
            title="Remove"
          >
            <Ico.Minus />
          </button>
        </div>
      ))}
      <button className={addjobcss.addRowBtn} onClick={add}>
        <Ico.Plus /> Add Date Row
      </button>
    </div>
  );
}

function Step3FeeAge({ data, set }) {
  const updFee = (i, key, val) => {
    const arr = data.applicationFees.map((r, idx) =>
      idx === i ? { ...r, [key]: val } : r,
    );
    set({ ...data, applicationFees: arr });
  };
  const addFee = () =>
    set({
      ...data,
      applicationFees: [...data.applicationFees, { label: "", fee: "" }],
    });
  const remFee = (i) =>
    set({
      ...data,
      applicationFees: data.applicationFees.filter((_, idx) => idx !== i),
    });

  const updAge = (i, key, val) => {
    const arr = data.ageLimits.map((r, idx) =>
      idx === i ? { ...r, [key]: val } : r,
    );
    set({ ...data, ageLimits: arr });
  };
  const addAge = () =>
    set({ ...data, ageLimits: [...data.ageLimits, { label: "", value: "" }] });
  const remAge = (i) =>
    set({ ...data, ageLimits: data.ageLimits.filter((_, idx) => idx !== i) });

  return (
    <div>
      <p
        style={{
          fontWeight: 700,
          color: "var(--navy)",
          fontFamily: "var(--font-d)",
          fontSize: "1rem",
          marginBottom: 10,
        }}
      >
        Application Fees
      </p>
      <div className={addjobcss.dynList} style={{ marginBottom: 28 }}>
        {data.applicationFees.map((r, i) => (
          <div key={i} className={addjobcss.dynRow}>
            <Field label="Category Label">
              <input
                className={addjobcss.input}
                placeholder="e.g. For General, OBC"
                value={r.label}
                onChange={(e) => updFee(i, "label", e.target.value)}
              />
            </Field>
            <Field label="Fee (₹)">
              <input
                className={addjobcss.input}
                type="text"
                placeholder="e.g. 500"
                value={r.fee}
                onChange={(e) => updFee(i, "fee", e.target.value)}
              />
            </Field>
            <button
              className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
              onClick={() => remFee(i)}
            >
              <Ico.Minus />
            </button>
          </div>
        ))}
        <button className={addjobcss.addRowBtn} onClick={addFee}>
          <Ico.Plus /> Add Fee Row
        </button>
      </div>

      <p
        style={{
          fontWeight: 700,
          color: "var(--navy)",
          fontFamily: "var(--font-d)",
          fontSize: "1rem",
          marginBottom: 10,
        }}
      >
        Age Limits
      </p>
      <div className={addjobcss.dynList}>
        {data.ageLimits.map((r, i) => (
          <div key={i} className={addjobcss.dynRow}>
            <Field label="Age Category">
              <input
                className={addjobcss.input}
                placeholder="e.g. Minimum Age"
                value={r.label}
                onChange={(e) => updAge(i, "label", e.target.value)}
              />
            </Field>
            <Field label="Age Value">
              <input
                className={addjobcss.input}
                placeholder="e.g. 21 Years"
                value={r.value}
                onChange={(e) => updAge(i, "value", e.target.value)}
              />
            </Field>
            <button
              className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
              onClick={() => remAge(i)}
            >
              <Ico.Minus />
            </button>
          </div>
        ))}
        <button className={addjobcss.addRowBtn} onClick={addAge}>
          <Ico.Plus /> Add Age Row
        </button>
      </div>
    </div>
  );
}

function Step4Vacancy({ data, set }) {
  const updVac = (i, key, val) => {
    const arr = data.postsWithNoVaccancy.map((r, idx) =>
      idx === i ? { ...r, [key]: val } : r,
    );
    set({ ...data, postsWithNoVaccancy: arr });
  };
  const addVac = () =>
    set({
      ...data,
      postsWithNoVaccancy: [
        ...data.postsWithNoVaccancy,
        { PostLevel: "", noVaccancy: "" },
      ],
    });
  const remVac = (i) =>
    set({
      ...data,
      postsWithNoVaccancy: data.postsWithNoVaccancy.filter(
        (_, idx) => idx !== i,
      ),
    });

  const updEl = (i, key, val) => {
    const arr = data.postsWithElligibility.map((r, idx) =>
      idx === i ? { ...r, [key]: val } : r,
    );
    set({ ...data, postsWithElligibility: arr });
  };
  const addEl = () =>
    set({
      ...data,
      postsWithElligibility: [
        ...data.postsWithElligibility,
        { PostLevel: "", elligibility: "" },
      ],
    });
  const remEl = (i) =>
    set({
      ...data,
      postsWithElligibility: data.postsWithElligibility.filter(
        (_, idx) => idx !== i,
      ),
    });

  return (
    <div>
      <p
        style={{
          fontWeight: 700,
          color: "var(--navy)",
          fontFamily: "var(--font-d)",
          fontSize: "1rem",
          marginBottom: 10,
        }}
      >
        Post-wise Vacancies
      </p>
      <div className={addjobcss.dynList} style={{ marginBottom: 28 }}>
        {data.postsWithNoVaccancy.map((r, i) => (
          <div key={i} className={addjobcss.dynRow}>
            <Field label="Post Name">
              <input
                className={addjobcss.input}
                placeholder="e.g. Track Maintainer"
                value={r.PostLevel}
                onChange={(e) => updVac(i, "PostLevel", e.target.value)}
              />
            </Field>
            <Field label="No. of Vacancies">
              <input
                className={addjobcss.input}
                type="number"
                placeholder="e.g. 10000"
                value={r.noVaccancy}
                onChange={(e) => updVac(i, "noVaccancy", e.target.value)}
              />
            </Field>
            <button
              className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
              onClick={() => remVac(i)}
            >
              <Ico.Minus />
            </button>
          </div>
        ))}
        <button className={addjobcss.addRowBtn} onClick={addVac}>
          <Ico.Plus /> Add Vacancy Row
        </button>
      </div>

      <p
        style={{
          fontWeight: 700,
          color: "var(--navy)",
          fontFamily: "var(--font-d)",
          fontSize: "1rem",
          marginBottom: 10,
        }}
      >
        Eligibility / Qualification
      </p>
      <div className={addjobcss.dynList}>
        {data.postsWithElligibility.map((r, i) => (
          <div key={i} className={addjobcss.dynRow}>
            <Field label="Post Name">
              <input
                className={addjobcss.input}
                placeholder="e.g. Track Maintainer"
                value={r.PostLevel}
                onChange={(e) => updEl(i, "PostLevel", e.target.value)}
              />
            </Field>
            <Field label="Eligibility">
              <input
                className={addjobcss.input}
                placeholder="e.g. 10th Pass from recognized board"
                value={r.elligibility}
                onChange={(e) => updEl(i, "elligibility", e.target.value)}
              />
            </Field>
            <button
              className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
              onClick={() => remEl(i)}
            >
              <Ico.Minus />
            </button>
          </div>
        ))}
        <button className={addjobcss.addRowBtn} onClick={addEl}>
          <Ico.Plus /> Add Eligibility Row
        </button>
      </div>
    </div>
  );
}

function Step5Links({ data, set }) {
  const upd = (i, key, val) => {
    const arr = data.headingLinks.map((r, idx) =>
      idx === i ? { ...r, [key]: val } : r,
    );
    set({ ...data, headingLinks: arr });
  };
  const add = () =>
    set({
      ...data,
      headingLinks: [...data.headingLinks, { Level: "", Link: "" }],
    });
  const rem = (i) =>
    set({
      ...data,
      headingLinks: data.headingLinks.filter((_, idx) => idx !== i),
    });

  return (
    <div className={addjobcss.dynList}>
      {data.headingLinks.map((r, i) => (
        <div key={i} className={addjobcss.dynRow}>
          <Field label="Button Label">
            <input
              className={addjobcss.input}
              placeholder="e.g. Apply Online"
              value={r.Level}
              onChange={(e) => upd(i, "Level", e.target.value)}
            />
          </Field>
          <Field label="URL">
            <input
              className={addjobcss.input}
              placeholder="https://..."
              value={r.Link}
              onChange={(e) => upd(i, "Link", e.target.value)}
            />
          </Field>
          <button
            className={`${addjobcss.iconBtn} ${addjobcss.btnRemove}`}
            onClick={() => rem(i)}
          >
            <Ico.Minus />
          </button>
        </div>
      ))}
      <button className={addjobcss.addRowBtn} onClick={add}>
        <Ico.Plus /> Add Link
      </button>
    </div>
  );
}

// ─── JOB DETAIL PAGE ─────────────────────────────────────────────────────────

// function JobPage({ data, onEdit }) {
//   const total = data.postsWithNoVaccancy.reduce(
//     (s, p) => s + (parseInt(p.noVaccancy, 10) || 0),
//     0,
//   );
//   const fmtNum = (n) => n.toLocaleString("en-IN");

//   const dateClass = (hex) => {
//     if (hex === "#28a745") return addjobcss.dateGreen;
//     if (hex === "#dc3545") return addjobcss.dateRed;
//     return addjobcss.dateBlue;
//   };

//   return (
//     <div className={addjobcss.page}>
//       <div className={addjobcss.topStripe} />

//       {/* Header */}
//       <header className={addjobcss.pageHeader}>
//         <div className={addjobcss.pageHeaderIn}>
//           <div className={addjobcss.pageLogo}>
//             <Ico.Train />
//           </div>
//           <div className={addjobcss.pageHeaderText}>
//             <h1>{data.boardName || "Board Name"}</h1>
//             <p>Government of India — Ministry of Railways</p>
//           </div>
//           {data.advertisementNo && (
//             <div className={addjobcss.advBadge}>{data.advertisementNo}</div>
//           )}
//         </div>
//       </header>

//       {/* Title Banner */}
//       <div className={addjobcss.titleBanner}>
//         <h2>
//           <span>{data.title || "Job Title"}</span>
//         </h2>
//         <p>{data.postName}</p>
//       </div>
//       <div className={addjobcss.redDivider} />

//       {/* Quick Stats */}
//       <div className={addjobcss.statsRow}>
//         {data.noOfVacancies && (
//           <div className={addjobcss.statItem}>
//             <div className={addjobcss.statLabel}>Total Vacancies</div>
//             <div className={`${addjobcss.statValue} ${addjobcss.statRed}`}>
//               {fmtNum(parseInt(data.noOfVacancies))}
//             </div>
//           </div>
//         )}
//         {data.startDate && (
//           <div className={addjobcss.statItem}>
//             <div className={addjobcss.statLabel}>Apply Start</div>
//             <div className={addjobcss.statValue} style={{ fontSize: "1rem" }}>
//               {data.startDate}
//             </div>
//           </div>
//         )}
//         {data.endDate && (
//           <div className={addjobcss.statItem}>
//             <div className={addjobcss.statLabel}>Last Date</div>
//             <div className={addjobcss.statValue} style={{ fontSize: "1rem" }}>
//               {data.endDate}
//             </div>
//           </div>
//         )}
//         {(data.minAgeLimit || data.maxAgeLimit) && (
//           <div className={addjobcss.statItem}>
//             <div className={addjobcss.statLabel}>Age Limit</div>
//             <div className={addjobcss.statValue}>
//               {data.minAgeLimit} – {data.maxAgeLimit} Yrs
//             </div>
//           </div>
//         )}
//         {data.postDate && (
//           <div className={addjobcss.statItem}>
//             <div className={addjobcss.statLabel}>Posted On</div>
//             <div className={`${addjobcss.statValue} ${addjobcss.statSmall}`}>
//               {data.postDate}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Edit Button */}
//       <div className={addjobcss.editWrap}>
//         <button className={addjobcss.btnEdit} onClick={onEdit}>
//           <Ico.Edit /> Edit Form
//         </button>
//       </div>

//       {/* Main Grid */}
//       <main className={addjobcss.pageMain}>
//         {/* Important Dates */}
//         {data.importantDates.some((d) => d.label || d.date) && (
//           <div className={addjobcss.secCard}>
//             <div className={addjobcss.secHead}>
//               <div className={addjobcss.secHeadIcon}>
//                 <Ico.Cal />
//               </div>
//               <h3>Important Dates</h3>
//             </div>
//             <table className={addjobcss.tbl}>
//               <tbody>
//                 {data.importantDates
//                   .filter((d) => d.label || d.date)
//                   .map((d, i) => (
//                     <tr key={i}>
//                       <td className={addjobcss.tdKey}>{d.label}</td>
//                       <td style={{ color: d.textColor, fontWeight: 600 }}>
//                         {d.date.includes("Extended") ? (
//                           <>
//                             {d.date.replace("Extended", "").trim()}
//                             <span className={addjobcss.extBadge}>Extended</span>
//                           </>
//                         ) : (
//                           d.date
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Fee + Age */}
//         <div className={addjobcss.secCard}>
//           {data.applicationFees.some((f) => f.label || f.fee) && (
//             <>
//               <div className={addjobcss.secHead}>
//                 <div className={addjobcss.secHeadIcon}>
//                   <Ico.Fee />
//                 </div>
//                 <h3>Application Fee</h3>
//               </div>
//               <table className={addjobcss.tbl}>
//                 <thead>
//                   <tr>
//                     <th>Category</th>
//                     <th>Fee (₹)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.applicationFees
//                     .filter((f) => f.label || f.fee)
//                     .map((f, i) => (
//                       <tr key={i}>
//                         <td className={addjobcss.tdKeyW}>{f.label}</td>
//                         <td>
//                           <span className={addjobcss.feeBadge}>₹ {f.fee}</span>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </>
//           )}
//           {data.ageLimits.some((a) => a.label || a.value) && (
//             <>
//               <div className={addjobcss.subHead}>
//                 <div className={addjobcss.subHeadIcon}>
//                   <Ico.Person />
//                 </div>
//                 <span>
//                   Age Limit {data.ageRefDate && `(as on ${data.ageRefDate})`}
//                 </span>
//               </div>
//               <table className={addjobcss.tbl}>
//                 <tbody>
//                   {data.ageLimits
//                     .filter((a) => a.label || a.value)
//                     .map((a, i) => (
//                       <tr key={i}>
//                         <td className={addjobcss.tdKey}>{a.label}</td>
//                         <td>
//                           <span className={addjobcss.ageChip}>{a.value}</span>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </>
//           )}
//         </div>

//         {/* Vacancies */}
//         {data.postsWithNoVaccancy.some((p) => p.PostLevel || p.noVaccancy) && (
//           <div className={addjobcss.secCard}>
//             <div className={addjobcss.secHead}>
//               <div className={addjobcss.secHeadIcon}>
//                 <Ico.People />
//               </div>
//               <h3>Post-wise Vacancy</h3>
//             </div>
//             <table className={addjobcss.tbl}>
//               <thead>
//                 <tr>
//                   <th>Post Name</th>
//                   <th>Vacancies</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.postsWithNoVaccancy
//                   .filter((p) => p.PostLevel || p.noVaccancy)
//                   .map((p, i) => (
//                     <tr key={i}>
//                       <td className={addjobcss.tdKeyW}>{p.PostLevel}</td>
//                       <td>
//                         <span className={addjobcss.vacNum}>
//                           {p.noVaccancy ? fmtNum(parseInt(p.noVaccancy)) : "—"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 {total > 0 && (
//                   <tr className={addjobcss.totalRow}>
//                     <td className={addjobcss.tdKeyW}>
//                       <strong>Total</strong>
//                     </td>
//                     <td>
//                       <span
//                         className={`${addjobcss.vacNum} ${addjobcss.vacNumRed}`}
//                       >
//                         {fmtNum(total)}
//                       </span>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Eligibility */}
//         {data.postsWithElligibility.some(
//           (p) => p.PostLevel || p.elligibility,
//         ) && (
//           <div className={addjobcss.secCard}>
//             <div className={addjobcss.secHead}>
//               <div className={addjobcss.secHeadIcon}>
//                 <Ico.Shield />
//               </div>
//               <h3>Eligibility / Qualification</h3>
//             </div>
//             <table className={addjobcss.tbl}>
//               <thead>
//                 <tr>
//                   <th>Post</th>
//                   <th>Qualification</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.postsWithElligibility
//                   .filter((p) => p.PostLevel || p.elligibility)
//                   .map((p, i) => (
//                     <tr key={i}>
//                       <td className={addjobcss.tdKeyW}>{p.PostLevel}</td>
//                       <td>{p.elligibility}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Links */}
//         {data.headingLinks.some((l) => l.Level || l.Link) && (
//           <div className={`${addjobcss.secCard} ${addjobcss.fullWidth}`}>
//             <div className={addjobcss.secHead}>
//               <div className={addjobcss.secHeadIcon}>
//                 <Ico.LinkIc />
//               </div>
//               <h3>Important Links</h3>
//             </div>
//             <div className={addjobcss.linksGrid}>
//               {data.headingLinks
//                 .filter((l) => l.Level || l.Link)
//                 .map((l, i) => (
//                   <a
//                     key={i}
//                     href={l.Link || "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`${addjobcss.linkBtn} ${i === 0 ? addjobcss.linkPrimary : addjobcss.linkSecondary}`}
//                   >
//                     {i === 0 ? <Ico.Apply /> : <Ico.Dl />}
//                     {l.Level}
//                   </a>
//                 ))}
//             </div>
//             <div className={addjobcss.postMeta}>
//               Posted on: {data.postDate} &nbsp;|&nbsp; Advertisement No:{" "}
//               {data.advertisementNo} &nbsp;|&nbsp; {data.boardName}
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className={addjobcss.pageFooter}>
//         <strong>{data.boardName}</strong> — Government of India, Ministry of
//         Railways
//         <br />
//         Advertisement No: {data.advertisementNo} &nbsp;|&nbsp; This page is for
//         informational purposes only.
//       </footer>
//     </div>
//   );
// }

// ─── WIZARD STEP ICONS MAP ────────────────────────────────────────────────────

const STEP_ICONS = [
  <Ico.Basic />,
  <Ico.Cal />,
  <Ico.Fee />,
  <Ico.People />,
  <Ico.LinkIc />,
];

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function AddJob({
  mode = "add",
  initialData = null,
  jobId = null,
  onSuccess,
  onCancel,
}) {
  const isEdit = mode === "edit";
  const [step, setStep] = useState(0);
  // Merge onto defaults so every field stays a controlled input in edit mode.
  const [data, setData] = useState(() => ({
    ...initState(),
    ...(initialData || {}),
  }));
  const [loading, setLoading] = useState(false);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));
  const submit = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = isEdit
        ? await updateJob(jobId, data)
        : await createJob(data);
      if (response?.success) {
        toast.success(
          response?.message ||
            (isEdit ? "Updated Successfully!" : "Added Successfully!"),
        );
        if (!isEdit) {
          setData(initState());
          setStep(0);
        }
        onSuccess?.(response?.data);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error?.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={addjobcss.root}>
      <div className={addjobcss.wizardWrap}>
        {/* Header */}
        <div className={addjobcss.wizardHeader}>
          <div className={addjobcss.wizardLogo}>
            <Ico.Train />
          </div>
          <h1>{isEdit ? "Update Job Notification" : "Add Job Notification"}</h1>
          <p>
            {isEdit
              ? "Edit the details and save your changes"
              : "Fill in all sections to publish the recruitment page"}
          </p>
          {onCancel && (
            <button
              type="button"
              className={addjobcss.btnPrev}
              style={{ marginTop: 12 }}
              onClick={onCancel}
            >
              ← Back to list
            </button>
          )}
        </div>

        {/* Step Bar */}
        <div className={addjobcss.stepBar}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`${addjobcss.stepPill} ${i === step ? addjobcss.stepPillActive : i < step ? addjobcss.stepPillDone : ""}`}
            >
              <span className={addjobcss.stepNum}>
                {i < step ? "✓" : i + 1}
              </span>
              {s.icon} {s.label}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className={addjobcss.card}>
          <div className={addjobcss.cardHead}>
            <div className={addjobcss.cardHeadIcon}>{STEP_ICONS[step]}</div>
            <h2>
              Step {step + 1}: {STEPS[step].label}
            </h2>
          </div>
          <div className={addjobcss.cardBody}>
            {step === 0 && <Step1Basic data={data} set={setData} />}
            {step === 1 && <Step2Dates data={data} set={setData} />}
            {step === 2 && <Step3FeeAge data={data} set={setData} />}
            {step === 3 && <Step4Vacancy data={data} set={setData} />}
            {step === 4 && <Step5Links data={data} set={setData} />}
          </div>
        </div>

        {/* Navigation */}
        <div className={addjobcss.navRow}>
          <button
            className={addjobcss.btnPrev}
            onClick={goPrev}
            disabled={step === 0}
            style={{ opacity: step === 0 ? 0.4 : 1 }}
          >
            ← Previous
          </button>
          <span className={addjobcss.stepCount}>
            Step {step + 1} of {STEPS.length}
          </span>
          {step < STEPS.length - 1 ? (
            <button className={addjobcss.btnNext} onClick={goNext}>
              Next →
            </button>
          ) : (
            <button
              className={addjobcss.btnSubmit}
              onClick={submit}
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading
                ? "Submitting..."
                : isEdit
                  ? "Update Job"
                  : "Generate Job Page"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
