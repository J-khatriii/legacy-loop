import { useEffect, useMemo, useState } from "react";
import {
  Camera,
  Edit3,
  Link as LinkIcon,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Plus,
  Settings,
  Users,
  Check,
  Search,
  X,
} from "lucide-react";

// ---- mock user (swap with real data) ----
const initialUser = {
  name: "John Carter",
  username: "@johncarter",
  role: "Full Stack Developer",
  bio: "Building beautiful digital products. JavaScript lover. Open-source contributor.",
  location: "Bangalore, India",
  website: "https://johncarter.dev",
  joined: "Jan 2024",
  email: "john@example.com",
  connections: 148,
  socials: {
    twitter: "johncodes",
    instagram: "john_ui",
    github: "johncarter-dev",
    linkedin: "johncarter",
  },
  bannerUrl: "",
  avatarUrl: "https://i.pravatar.cc/150?img=32",
};

// ---- tiny helpers ----
const Chip = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700">
    {children}
  </span>
);

// ====== MAIN PAGE ======
const Profile = () => {
  const [user, setUser] = useState(initialUser);
  const [banner, setBanner] = useState(user.bannerUrl);
  const [avatar, setAvatar] = useState(user.avatarUrl);

  const [tab, setTab] = useState("About");
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // connections demo data
  const [queryConn, setQueryConn] = useState("");
  const [connections, setConnections] = useState(
    Array.from({ length: 16 }).map((_, i) => ({
      id: i + 1,
      name: ["Ava", "Leo", "Mia", "Noah", "Zoe", "Arjun", "Saanvi", "Kabir"][
        i % 8
      ] + ` ${i % 2 ? "Shah" : "Kumar"}`,
      role: ["UI Designer", "Backend Dev", "SRE", "Product Designer"][
        i % 4
      ],
      avatar: `https://i.pravatar.cc/60?img=${10 + i}`,
      connected: i % 3 !== 0,
      mutuals: (i * 3) % 7,
    }))
  );

  // sticky offset so the header never looks cut
  useEffect(() => {
    // If parent has any top padding, we don't fight it. We keep our own.
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const filteredConnections = useMemo(() => {
    const q = queryConn.trim().toLowerCase();
    if (!q) return connections;
    return connections.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q)
    );
  }, [connections, queryConn]);

  const tabs = [
    "About",
    "Posts",
    "Connections",
    "Media",
    "Portfolio",
    "Resume",
    "Badges",
  ];

  const saveEditedUser = (patched) => {
    setUser((u) => ({ ...u, ...patched }));
    if (patched.bannerUrl !== undefined) setBanner(patched.bannerUrl);
    if (patched.avatarUrl !== undefined) setAvatar(patched.avatarUrl);
  };

  return (
    <div className="w-full min-h-full bg-gray-50">
      {/* top breathing space so nothing feels clipped */}
      <div className="h-4" />

      {/* Banner */}
      <section className="relative w-full">
        <div className="w-full bg-gray-200 rounded-lg">
          <div className="aspect-16/4 w-full rounded-lg overflow-hidden">
            {banner ? (
              <img
                src={banner}
                alt="Profile banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-r from-gray-200 to-gray-300" />
            )}
          </div>
        </div>
        <label className="absolute right-4 bottom-4 bg-black/50 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
          <Camera size={16} />
          Change Cover
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setBanner(URL.createObjectURL(f));
            }}
          />
        </label>
      </section>

      {/* Header block */}
      <section className="px-6 -mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* avatar */}
            <div className="relative -mt-10 sm:-mt-14">
              <img
                src={avatar}
                alt="Avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white"
              />
              <label className="absolute right-1 bottom-1 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAvatar(URL.createObjectURL(f));
                  }}
                />
              </label>
            </div>

            {/* basic info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <Chip>{user.role}</Chip>
              </div>
              <p className="text-gray-500">{user.username}</p>
              <p className="mt-3 text-gray-700 max-w-3xl">{user.bio}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-700">
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {user.location}
                </span>
                <span className="flex items-center gap-2">
                  <Globe size={16} />
                  <a
                    className="text-indigo-600 hover:underline"
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.website}
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> Joined {user.joined}
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-gray-700">
                <Users size={18} />
                <span className="font-semibold text-gray-900">
                  {user.connections}
                </span>
                <span className="text-gray-500">connections</span>
              </div>
            </div>

            {/* actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setShowEdit(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2"
              >
                <Settings size={16} /> Settings
              </button>
            </div>
          </div>

          {/* socials */}
          <div className="flex gap-4 mt-6 text-gray-600">
            <a
              className="hover:text-indigo-600"
              href={`https://twitter.com/${user.socials.twitter}`}
              target="_blank"
              rel="noreferrer"
              title="Twitter"
            >
              <Twitter />
            </a>
            <a
              className="hover:text-indigo-600"
              href={`https://instagram.com/${user.socials.instagram}`}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <Instagram />
            </a>
            <a
              className="hover:text-indigo-600"
              href={`https://github.com/${user.socials.github}`}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <Github />
            </a>
            <a
              className="hover:text-indigo-600"
              href={`https://linkedin.com/in/${user.socials.linkedin}`}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </section>

      {/* sticky tabs */}
      <div className="px-6 mt-4 sticky top-0 z-1">
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 px-2 sm:px-4">
            {tabs.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`py-3 px-3 sm:px-4 text-sm whitespace-nowrap border-b-2 ${
                    active
                      ? "border-indigo-600 text-indigo-700 font-medium"
                      : "border-transparent text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* tab content */}
      <div className="px-6 py-6 space-y-6">
        {tab === "About" && <AboutBlock user={user} />}

        {tab === "Posts" && (
          <SectionCard title="Posts">
            <p className="text-gray-500">No posts yet.</p>
          </SectionCard>
        )}

        {tab === "Connections" && (
          <SectionCard title="Connections">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg max-w-lg">
              <Search size={16} className="text-gray-500" />
              <input
                value={queryConn}
                onChange={(e) => setQueryConn(e.target.value)}
                placeholder="Search connections"
                className="bg-transparent w-full text-sm outline-none"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredConnections.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-4 bg-white flex items-center gap-3"
                >
                  <img
                    src={c.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={c.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">{c.role}</p>
                    <p className="text-[11px] text-gray-400">
                      {c.mutuals} mutual connection{c.mutuals === 1 ? "" : "s"}
                    </p>
                  </div>
                  {c.connected ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setConnections((arr) =>
                            arr.map((x) =>
                              x.id === c.id ? { ...x, connected: false } : x
                            )
                          )
                        }
                        className="px-3 py-1.5 text-sm border rounded-lg"
                      >
                        Unfollow
                      </button>
                      <button
                        onClick={() =>
                          setConnections((arr) => arr.filter((x) => x.id !== c.id))
                        }
                        className="px-3 py-1.5 text-sm border rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setConnections((arr) =>
                          arr.map((x) =>
                            x.id === c.id ? { ...x, connected: true } : x
                          )
                        )
                      }
                      className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg"
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === "Media" && (
          <SectionCard title="Media">
            <p className="text-gray-500">No media uploaded.</p>
          </SectionCard>
        )}

        {tab === "Portfolio" && (
          <SectionCard title="Portfolio">
            <p className="text-gray-500">Add case studies and links.</p>
          </SectionCard>
        )}

        {tab === "Resume" && (
          <SectionCard title="Resume">
            <div className="flex items-center gap-2 text-sm">
              <LinkIcon size={16} />
              <a className="text-indigo-600" href="#" onClick={(e) => e.preventDefault()}>
                Upload or link your resume
              </a>
            </div>
          </SectionCard>
        )}

        {tab === "Badges" && (
          <SectionCard title="Badges">
            <div className="flex gap-2">
              <Chip>Early Adopter</Chip>
              <Chip>Open Source</Chip>
              <Chip>Top Writer</Chip>
            </div>
          </SectionCard>
        )}

        <div className="h-6" />
      </div>

      {/* Modals */}
      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSave={(patch) => {
            saveEditedUser(patch);
            setShowEdit(false);
          }}
        />
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

// ====== SUBCOMPONENTS ======

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl border shadow-sm p-5">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const AboutBlock = ({ user }) => (
  <SectionCard title="About">
    <p className="text-gray-700 max-w-3xl">
      Passionate full stack developer with 5+ years’ experience building
      responsive web apps. Loves React, cloud architecture, and product design.
    </p>

    {/* Contact */}
    <div className="mt-6">
      <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Mail size={16} /> {user.email}
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon size={16} /> {user.website}
        </div>
      </div>
    </div>

    {/* Experience */}
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Experience</h3>
        <button className="flex items-center gap-2 text-indigo-600">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="p-4 border rounded-lg">
          <p className="font-semibold">Senior Developer – Google</p>
          <p className="text-sm text-gray-500">2022 – Present</p>
          <p className="text-gray-700 mt-2">
            Working on high-scale distributed systems.
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="font-semibold">Frontend Developer – Swiggy</p>
          <p className="text-sm text-gray-500">2020 – 2022</p>
          <p className="text-gray-700 mt-2">Web performance and design systems.</p>
        </div>
      </div>
    </div>

    {/* Skills */}
    <div className="mt-8">
      <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {["React", "Node.js", "Next.js", "MongoDB", "UI/UX", "DevOps"].map(
          (skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
            >
              {skill}
            </span>
          )
        )}
      </div>
    </div>
  </SectionCard>
);

// ---- Edit Profile Modal ----
const EditProfileModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: user.name,
    role: user.role,
    username: user.username,
    bio: user.bio,
    location: user.location,
    website: user.website,
    email: user.email,
    socials: { ...user.socials },
    bannerUrl: user.bannerUrl,
    avatarUrl: user.avatarUrl,
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="font-semibold">Edit Profile</h3>
          <button onClick={onClose} className="p-1 text-gray-500">
            <X />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* media */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MediaPicker
              label="Cover"
              value={form.bannerUrl}
              onChange={(url) => setForm((f) => ({ ...f, bannerUrl: url }))}
              ratio="16/4"
            />
            <MediaPicker
              label="Avatar"
              value={form.avatarUrl}
              onChange={(url) => setForm((f) => ({ ...f, avatarUrl: url }))}
              ratio="1/1"
              round
            />
          </div>

          {/* fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            />
            <Input
              label="Username"
              value={form.username}
              onChange={(v) => setForm((f) => ({ ...f, username: v }))}
            />
            <Input
              label="Role"
              value={form.role}
              onChange={(v) => setForm((f) => ({ ...f, role: v }))}
            />
            <Input
              label="Email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            />
            <Input
              label="Location"
              value={form.location}
              onChange={(v) => setForm((f) => ({ ...f, location: v }))}
            />
            <Input
              label="Website"
              value={form.website}
              onChange={(v) => setForm((f) => ({ ...f, website: v }))}
            />
          </div>

          <Textarea
            label="Bio"
            rows={4}
            value={form.bio}
            onChange={(v) => setForm((f) => ({ ...f, bio: v }))}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Twitter"
              value={form.socials.twitter}
              onChange={(v) =>
                setForm((f) => ({ ...f, socials: { ...f.socials, twitter: v } }))
              }
            />
            <Input
              label="Instagram"
              value={form.socials.instagram}
              onChange={(v) =>
                setForm((f) => ({
                  ...f,
                  socials: { ...f.socials, instagram: v },
                }))
              }
            />
            <Input
              label="GitHub"
              value={form.socials.github}
              onChange={(v) =>
                setForm((f) => ({ ...f, socials: { ...f.socials, github: v } }))
              }
            />
            <Input
              label="LinkedIn"
              value={form.socials.linkedin}
              onChange={(v) =>
                setForm((f) => ({
                  ...f,
                  socials: { ...f.socials, linkedin: v },
                }))
              }
            />
          </div>
        </div>

        <div className="px-5 py-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
          >
            <Check size={16} /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ---- Settings Modal ----
const SettingsModal = ({ onClose }) => {
  const [privacy, setPrivacy] = useState("public");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [theme, setTheme] = useState("system");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="font-semibold">Profile Settings</h3>
          <button onClick={onClose} className="p-1 text-gray-500">
            <X />
          </button>
        </div>

        <div className="p-5 grid gap-6 md:grid-cols-2">
          <CardBlock title="Privacy">
            <Radio
              name="privacy"
              checked={privacy === "public"}
              onChange={() => setPrivacy("public")}
              label="Public profile"
            />
            <Radio
              name="privacy"
              checked={privacy === "connections"}
              onChange={() => setPrivacy("connections")}
              label="Visible to connections"
            />
            <Radio
              name="privacy"
              checked={privacy === "private"}
              onChange={() => setPrivacy("private")}
              label="Private"
            />
          </CardBlock>

          <CardBlock title="Notifications">
            <Toggle
              label="Email notifications"
              checked={emailNotif}
              onChange={setEmailNotif}
            />
            <Toggle
              label="Push notifications"
              checked={pushNotif}
              onChange={setPushNotif}
            />
          </CardBlock>

          <CardBlock title="Appearance">
            <Radio
              name="theme"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
              label="Light"
            />
            <Radio
              name="theme"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
              label="Dark"
            />
            <Radio
              name="theme"
              checked={theme === "system"}
              onChange={() => setTheme("system")}
              label="System"
            />
          </CardBlock>

          <CardBlock title="Danger zone">
            <button className="px-4 py-2 border rounded-lg text-red-600 border-red-200 hover:bg-red-50">
              Deactivate account
            </button>
          </CardBlock>
        </div>

        <div className="px-5 py-4 border-t text-right">
          <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ---- small UI atoms ----
const Input = ({ label, value, onChange }) => (
  <label className="text-sm">
    <span className="text-gray-600">{label}</span>
    <input
      className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const Textarea = ({ label, value, onChange, rows = 3 }) => (
  <label className="text-sm">
    <span className="text-gray-600">{label}</span>
    <textarea
      rows={rows}
      className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const MediaPicker = ({ label, value, onChange, ratio = "16/9", round }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-600">{label}</p>
      {value && (
        <button className="text-xs text-gray-500" onClick={() => onChange("")}>
          Remove
        </button>
      )}
    </div>
    <div
      className={`w-full bg-gray-100 border rounded-xl overflow-hidden ${
        round ? "aspect-square" : `aspect-[${ratio}]`
      } flex items-center justify-center`}
    >
      {value ? (
        <img
          src={value}
          alt={label}
          className={`w-full h-full object-cover ${round ? "rounded-xl" : ""}`}
        />
      ) : (
        <div className="text-gray-400 text-sm">No image</div>
      )}
    </div>
    <label className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer">
      <Camera size={16} />
      Upload
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onChange(URL.createObjectURL(f));
        }}
      />
    </label>
  </div>
);

const CardBlock = ({ title, children }) => (
  <div className="border rounded-xl p-4">
    <h4 className="font-medium mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const Radio = ({ name, checked, onChange, label }) => (
  <label className="flex items-center gap-2 text-sm">
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className="accent-indigo-600"
    />
    {label}
  </label>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between text-sm">
    <span>{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition ${
        checked ? "bg-indigo-600" : "bg-gray-300"
      }`}
      type="button"
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          checked ? "right-0.5" : "left-0.5"
        }`}
      />
    </button>
  </label>
);

export default Profile;
