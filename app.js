const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const thing = ["Chess", "Table Tennis", "Vollyball", "Basketball"];

// Json Prettier middleware
app.use(json());
// Body Parser middleware
app.use(bodyParser());
// Adding additional properties to context
app.context.user = "Prabhat";

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Simple Middleware
//app.use(async ctx => (ctx.body = { msg: "Hello Test!" }));

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  debug: false,
  cache: false
});

// Routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

// Index
async function index(ctx) {
  await ctx.render("index", {
    title: "Things i love.",
    things: thing
  });
}

// Show Add Page
async function showAdd(ctx) {
  await ctx.render("add");
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  thing.push(body.thing);
  ctx.redirect("/");
}

router.get("/test", ctx => (ctx.body = `Hello ${ctx.user}`));
// Adding params to Url
router.get("/test2/:name", ctx => (ctx.body = `Hello ${ctx.params.name}`));

app.listen(9080, console.log("App connected!!"));
