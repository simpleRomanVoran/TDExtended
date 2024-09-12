// класс для работы с попапами
class Popup {
    // инициализация
    constructor(ID, TYPE, OPTION) {
        this.ID = ID;
        this.TYPE = TYPE;
        this.OPTION = OPTION;
        if (document.getElementById(ID)) {
            this.popupElement = document.getElementById(ID)
        } else {
            console.log ("popuper.js: Ошибка! Попап не существует!")
        }
    }

    // показать попап
    show () {
        if (this.TYPE == "class") {
                this.popupElement.classList.remove("popup_hide");
        } else if (this.TYPE == "display") {
            switch(this.OPTION) {
                case "block": this.popupElement.style.display = "block"; break;
                case "grid": this.popupElement.style.display = "grid"; break;
                case "inline": this.popupElement.style.display = "inline"; break;
                case "inline-block": this.popupElement.style.display = "inline-block"; break;
                default:  this.popupElement.style.display = "block";
            }
        } else {
            console.log ("popuper.js: Неверный тип: class/display")
        }
    }

    // скрыть попап
    hide () {
        if (this.TYPE == "class") {
            this.popupElement.classList.add("popup_hide");
        } else if (this.TYPE == "display") {
            this.popupElement.style.display = "none";
        } else {
            console.log ("popuper.js: Неверный тип: class/display")
        }
    }

    // переключить состояние попапа
    toggle () {
        if (this.TYPE == "class") {
            if (this.popupElement.classList.contains("popup_hide")) {
                this.popupElement.classList.remove("popup_hide");
            } else {
                this.popupElement.classList.add("popup_hide");
            }
        } else if (this.TYPE == "display") {
            if (this.popupElement.style.display == "none") {
                switch(this.OPTION) {
                    case "block": this.popupElement.style.display = "block"; break;
                    case "grid": this.popupElement.style.display = "grid"; break;
                    case "inline": this.popupElement.style.display = "inline"; break;
                    case "inline-block": this.popupElement.style.display = "inline-block"; break;
                    default:  this.popupElement.style.display = "block";
                }
            } else {
                this.popupElement.style.display = "none";
            }
        } else {
            console.log ("popuper.js: Неверный тип: class/display")
        }
    }
}

// Класс для работы с попапа
class Popuper {
    // инициализация
    constructor () {
        this.arrayPopups = [];
    }

    // регистрация попапов
    reg (arrayID, type, option) {
        for (let i in arrayID) {
            let popup = new Popup(arrayID[i], type, option);
            this.arrayPopups.push(popup);
        }
    }

    // поиск по айди-элемента
    find (ID) {
        for (let i in this.arrayPopups) {
            if (this.arrayPopups[i].ID == ID) {
                return this.arrayPopups[i]
            }
        }
    }
    
    // отдельная регистрация попапа
    regPopup (popup) {
        this.arrayPopups.push (popup);
    }

    // скрыть все попапы
    hideAll () {
        for (let i in this.arrayPopups) {
            this.arrayPopups[i].hide();
        }
    }

    // показать все попапы
    showAll () {
        for (let i in this.arrayPopups) {
            this.arrayPopups[i].show();
        }
    }

    // переключить все попапы
    toggleAll () {
        for (let i in this.arrayPopups) {
            this.arrayPopups[i].toggle();
        }
    }

    // показать один и скрыть остальные попапы по айди
    localShowForID (ID) {
        this.hideAll();
        let popup = this.find(ID);
        if (popup) {
            popup.show();
        } else {
            console.log ("popuper.js: Ошибка! Попап с ID: " + ID + " не найден!")
        }
    }

    // показать один и скрыть остальные попапы по попапу
    localShowForPopup (popup) {
        this.hideAll();
        popup.show();
    }
}

// Объект программы
let program = {
    // логгирование истории
    debugger: true,

    // включить
    on () {
        this.debugger = true;
    },

    // выключить
    off () {
        this.debugger = false;
    },

    // создание лога
    debuggerLog(text) {
        if (this.debugger == true) {
            console.log(text)
        }
    }
}

class Updater {
    // конструктор версий
    constructor (currentVersion, currentFullVersion) {
        this.currentVersion = currentVersion;
        this.currentFullVersion = currentFullVersion;
        this.compatibleVersions = [];
        this.availableVersion = JSON.parse(localStorage.getItem("version")) || currentVersion;
        if (this.comparisonVersion () == "stable") {program.debuggerLog("Запущена совместимая версия или программа ранее не запускалась.");}
        else if (this.comparisonVersion () == "dev") {program.debuggerLog("Режим совместимости для разработки, напишите автору: rakzar321@gmail.com для получения справки.")}
        else if (this.comparisonVersion () == "old") {program.debuggerLog("Ранее запущена старая версия программы, это может вызвать ошибки совместимости!")}
        else if (this.comparisonVersion () == "new") {program.debuggerLog("Ранее запущена новая версия программы, это может вызвать ошибки совместимости!")}
        else if (this.comparisonVersion () == "unknown") {program.debuggerLog("Ранее запущена неизвестная версия программы, это может вызвать ошибки совместимости!")}
        if (this.comparisonVersion () == "old" || this.comparisonVersion () == "new" || this.comparisonVersion () == "unknown") {
            if (confirm("Хотите удалить данные? Это устранит возможные проблемы. Напишите автору: rakzar321@gmail.com для получения справки.")) {
                localStorage.clear();
                document.location.reload();
            }
            else {
                program.debuggerLog("Советую вам написать мне: rakza321@gmail.com, ваша версия возможно не подходит к этой!")
                this.availableVersion = "dev"
                localStorage.setItem("version", JSON.stringify(this.availableVersion));
            }
        }
        localStorage.setItem("version", JSON.stringify(this.availableVersion));
    }

    // проверяет совместимость версий
    comparisonVersion () {
        for (let i in this.compatibleVersions) {
            if (this.availableVersion == "dev") {
                return 'dev'
            }
            else if (this.availableVersion == this.compatibleVersions[i]) {
                return 'stable'
            }
        }
        if (this.availableVersion == this.currentVersion) {
            return 'stable'
        }
        else if (this.availableVersion < this.currentVersion) {
            return 'old'
        }
        else if (this.availableVersion > this.currentVersion) {
            return 'new'
        }
        else {
            return 'unknown'
        }
    }
}

let version = new Updater (11, "11 close-alpha");

// хранит все элементы из registry как объекты, а не свойства
let elementObjectArray = []

class Registry {
    // инициализация
    constructor (localStorageName) {
        this.localStorageName = localStorageName;
        this.isFirstStart = false;

        this.registryGroup = [
            "task",
            "category",
            "container", 
            "ID",
        ]
        this.items = this.get() || this.constructorRegistry();
        this.set();
    }

    // получить реестр элементов
    get () {
        return JSON.parse(localStorage.getItem(this.localStorageName));
    }

    // сохранить реестр элементов
    set () {
        return localStorage.setItem(this.localStorageName, JSON.stringify(this.items));
    }

    // конструктор основного объекта
    constructorRegistry () {
        this.isFirstStart = true;
        let registryItems = {};
        for (let i in this.registryGroup) {
            if (this.registryGroup[i] == "ID") {
                registryItems[this.registryGroup[i]] = {};
            } else {
                registryItems[this.registryGroup[i]] = [];
            }
        }
        
        for (let i in this.registryGroup) {
            registryItems["ID"][this.registryGroup[i]] = 1;
        }

        return registryItems
    }
    
    // создание группы для отслеживания ID в реестре элементов
    addID (groupName) {
        if (this.items["ID"][groupName]) {
            console.warn ("Эта группа уже имеет ID");
        } else {
            this.items["ID"][groupName] = 1;
        }
        this.set();
    }

    // удалаение группы для отслеживания ID в реестре элементов
    removeID (groupName) {
        delete this.items["ID"][groupName];
        this.set();
    }

    // сохранение нового ID в реестре элементов для группы
    setID (groupName, ID) {
        this.items["ID"][groupName] = ID;
        this.set();
    }

    // повышает ID на единицу в реестре элементов для группы
    incrementID (groupName) {
        this.items["ID"][groupName] += 1
        this.set();
        return this.items["ID"][groupName]
    }

    // получает ID элемента в реестре для группы
    getID (groupName) {
        this.set();
        return this.items["ID"][groupName];
    }
    
    // создаёт "элемент" с новым айди в группе
    addItem (groupName, item) {
        this.items[groupName].push ([this.getID(groupName), item]);
        this.incrementID(groupName);
        this.set();
        elementObjectArray = this.createElementObjectArray ()
        return this.getID (groupName) - 1
    }

    // поиск внутри группы по ID, вывод: тело элемента
    findID (groupName, ID) {
        for (let i in this.items[groupName]) {
            if (this.items[groupName][i][0] == ID) {
                return this.items[groupName][i][1]
            }
        }
        return false
    }

    // поиск внутри группы по ID, вывод: индекс
    findIDForIndex (groupName, ID) {
        for (let i in this.items[groupName]) {
            if (this.items[groupName][i][0] == ID) {
                return i
            }
        }
        return false
    }

    // поиск внутри группы по INDEX, вывод: тела элемента
    findIndex (groupName, index) {
        return this.items[groupName][index][1];
    }

    // удаляет элемент из группы по ID
    removeItem (groupName, ID) {
        this.items[groupName].splice(this.findIDForIndex(groupName, ID), 1);
        this.set();
        elementObjectArray = this.createElementObjectArray ()
        return this.items[groupName]
    }

    // изменяет элемент в группе
    changeItem (groupName, ID, item) {
        this.items[groupName][this.findIDForIndex(groupName, ID)] = [ID, item];
        this.set();
        elementObjectArray = this.createElementObjectArray ()
    }

    // задаёт значение: objectArray
    createElementObjectArray () {
        let objectArray = {}
        objectArray["task"] = []
        objectArray["container"] = []
        objectArray["category"] = []
        
        for (let i in this.items["task"]) {
            objectArray["task"].push (new Task(this.items["task"][i][1], this.items["task"][i][0]));
        }

        for (let i in this.items["container"]) {
            objectArray["container"].push (new Container(this.items["container"][i][1], this.items["container"][i][0]));
        }

        for (let i in this.items["category"]) {
            objectArray["category"].push (new Category(this.items["category"][i][1], this.items["category"][i][0]));
        }

        return objectArray
    }
}

let registry = new Registry ("items");

class Element {
    // инициализация элемента
    constructor (groupItem, configuration, ID) {
        this.configuration = configuration;
        this.groupItem = groupItem;
        this.ID = ID;
        if (ID) {
        } else {
            this.connect ();
        }
    }

    // получить конфигурацию элемента
    get () {
        return this.configuration
    }

    // получить айди элемента
    getID () {
        return this.ID
    }

    // задать конфигурацию элементу
    set (configuration) {
        this.configuration = configuration
        registry.changeItem (this.groupItem, this.getID(), this.get());
        return this.configuration
    }

    // проверить параметр на значение элемента
    checkItem (parametrName, parametrValue) {
        if (this.configuration[parametrName] == parametrValue) {
            return true
        }
        else {
            return false
        }
    }

    // добавить параметр элементу или изменить его
    addItem (parametrName, parametrValue) {
        if (this.configuration[parametrName]) {
            return false
        } else {
            this.configuration[parametrName] = parametrValue;
        }
        registry.changeItem (this.groupItem, this.getID(), this.get());
        return parametrName
    }

    // удалить параметр элементу
    removeItem (parametrName) {
        delete this.configuration[parametrName]
        registry.changeItem (this.groupItem, this.getID(), this.get());
        return this.configuration
    }

    // изменить параметр элемента
    changeItem (parametrName, parametrValue) {
        this.configuration[parametrName] = parametrValue
        registry.changeItem (this.groupItem, this.getID(), this.get());
    }

    // соединить с реестром
    connect () {
        registry.addItem(this.groupItem, this.configuration);
    }
}

class Task extends Element {
    // инициализация
    constructor (configuration, ID) {
        super("task", configuration, ID);
    }

    // переключение важности
    important () {
        this.changeItem ("important", !this.configuration.important)
        return this.configuration.important;
    }

    // переключить помеченность
    checked () {
        this.changeItem ("checked", !this.configuration.checked)
        return this.configuration.checked;
    }

    getContainer () {
        if (controller.checkExistence(this.configuration.parentContainer)) {
            let container = registry.findID("container", this.configuration.parentContainer);
            return container
        } 
        return false
    }

    moveContainer (containerID) {
        if (registry.findID("container", containerID)) {
            this.changeItem ("parentContainer", containerID);
            controller.moveAllSubtask (this.getID(), containerID);
            return this.configuration.parentContainer
        }
        return false
    }
}

class Container extends Element {
    // инициализация
    constructor (configuration, ID) {
        super("container", configuration, ID);
    }
}

class Category extends Element {
    // инициализация
    constructor (configuration, ID) {
        super("category", configuration, ID);
    }
}

let controller = {
    // проверяет на существование контейнер по ID
    checkExistence (ID) {
        if (ID) {
            return true
        }
        else {
            return false
        }
    },

    getAllCategoryForTask (ID) {
        let categories = [];
        for (let i in elementObjectArray["category"]) {
            let tasks = launcher.getAllTasksFromCategory (i);
            for (j in tasks) {
                console.log ("ID: ", ID, "task[j]['ID']:", tasks[j]["ID"], ID == tasks[j]["ID"])
                if (ID == tasks[j]["ID"]) {
                    console.log (">>", elementObjectArray["category"][i].get().title);
                    categories.push (elementObjectArray["category"][i].get().title);
                }
            }
        }
        if (categories.length == 0) {
            console.log (false)
            return false
        }
        return categories
    },

    dellAllTaskFromContainer (ID) {
        let taskWithThisContainer = []
        for (let i in elementObjectArray["task"]) {
            console.log("task: ", elementObjectArray["task"][i].get())
            if (elementObjectArray["task"][i].checkItem ("parentContainer", ID)) {
                // registry.removeItem("task" , elementObjectArray["task"][i].getID()); // удаляем задачу
                taskWithThisContainer.push(elementObjectArray["task"][i].getID());
            }
        }
        
        for (let i in taskWithThisContainer) {
            console.log("Index task: ", registry.findIDForIndex("task", taskWithThisContainer[i]));
            registry.removeItem("task" , registry.findIDForIndex("task", taskWithThisContainer[i]));
        }
        // создать список
    },

    moveAllSubtask (ID, containerID) {
        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].getID() == ID) {
                for (let j in elementObjectArray["task"][i].childTask) {
                    for (let k in elementObjectArray["task"]) {
                        if (elementObjectArray["task"][k].getID() == elementObjectArray["task"][i].childTask[j]) {
                            elementObjectArray["task"][k].moveContainer (containerID);
                        }
                    }
                }
            }
        }
    },

    // удалить все задачи контейнера
    // удалить задачу из всех категорий
}

let launcher = {

    // при запуске программы
    start () {
        this.viewContainer();
        if (registry.isFirstStart) {
            // При первом запуске
            globalPopups.localShowForID("js-popup-about");
        }
    },

    // текущая задача
    currentTask: '',
    
    // создаёт задачу, через граф. интерфейс
    createTask () {
        if (this.currentContainer) {
            now = new Date ();
            createdCurrentTask = new Task({
                title: document.querySelector("#textTask").value,
                amount:  Number(document.querySelector("#amountTask").value),
                doneAmount:  Number(document.querySelector("#doneTask").value),
                checked: document.querySelector("#checkedTask").checked,
                important: document.querySelector("#importantTask").checked,
                date: `${now.getDate()+1 ? '0' + now.getDate() : now.getDate()}.${now.getMonth()+1 < 10 ? '0' + now.getMonth() : now.getMonth()}.${now.getFullYear()}`,
                time: `${now.getHours()+1 < 10 ? '0' + now.getHours() : now.getHours()}:${now.getMinutes()+1 < 10 ? '0' + now.getMinutes() : now.getMinutes()}:${now.getSeconds()+1 < 10 ? '0' + now.getSeconds() : now.getSeconds()}`,
                parentContainer: this.currentContainer,
                parentTask: '',
                childTask: [],
                level: 0,
            }, false);
            this.viewTask();
        }
    },

    // удалить задачу, через граф. интерфейс (Написан ChatGPT)
    deleteTask (ID = this.currentTask) {
        let taskIndex = elementObjectArray["task"].findIndex(task => task.getID() === ID);

        if (taskIndex !== -1) {
            let task = elementObjectArray["task"][taskIndex];
            task.get().childTask.forEach(childID => this.deleteTask(childID));
            registry.removeItem("task", ID);
            elementObjectArray = registry.createElementObjectArray();
            if (this.currentTask === ID) {
                this.currentTask = '';
            }
            this.viewTask();
        }
    },

    // изменить задачу, через граф. интерфейс
    changeTask () {
        index = 0;
        if (this.currentContainer) {
            if (this.currentTask) {
                for (let i in elementObjectArray["task"]) {
                    if (elementObjectArray["task"][i].getID() == this.currentTask) {
                        index = i;
                    }
                }
                if (this.currentContainer == elementObjectArray["task"][index].get().parentContainer) {
                    let newConfiguration = {
                        title: document.querySelector("#textTask").value,
                        amount:  Number(document.querySelector("#amountTask").value),
                        doneAmount:  Number(document.querySelector("#doneTask").value),
                        checked: document.querySelector("#checkedTask").checked,
                        important: document.querySelector("#importantTask").checked,
                        date: elementObjectArray["task"][index].get().date,
                        time: elementObjectArray["task"][index].get().time,
                        parentContainer: this.currentContainer,
                        parentTask: elementObjectArray["task"][index].get().parentTask,
                        childTask: elementObjectArray["task"][index].get().childTask,
                        level: elementObjectArray["task"][index].get().level,
                    }
                    registry.changeItem("task", this.currentTask, newConfiguration);
                    this.viewTask();
                }
            }
        }
    },

    // изменить важность задачи по айди
    importantTask (ID) {
        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].getID() == ID) {
                elementObjectArray["task"][i].important();
            }
        }
        this.viewTask();
    },

    // изменить отметку задачи по айди
    checkedTask (ID) {
        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].getID() == ID) {
                elementObjectArray["task"][i].checked();
            }
        }
        this.viewTask();
    },

    // создать подзадачу
    createSubtask (ID, level) {
        level = level + 1;
        now = new Date ();
        newTask = new Task({
            title: document.querySelector("#textTask").value,
            amount:  Number(document.querySelector("#amountTask").value),
            doneAmount:  Number(document.querySelector("#doneTask").value),
            checked: document.querySelector("#checkedTask").checked,
            important: document.querySelector("#importantTask").checked,
            date: `${now.getDate()+1 ? '0' + now.getDate() : now.getDate()}.${now.getMonth()+1 < 10 ? '0' + now.getMonth() : now.getMonth()}.${now.getFullYear()}`,
            time: `${now.getHours()+1 < 10 ? '0' + now.getHours() : now.getHours()}:${now.getMinutes()+1 < 10 ? '0' + now.getMinutes() : now.getMinutes()}:${now.getSeconds()+1 < 10 ? '0' + now.getSeconds() : now.getSeconds()}`,
            parentContainer: this.currentContainer,
            childTask: [],
            parentTask: ID,
            level: level,
        }, false);

        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].get()["parentTask"] == ID) {
                index = i
            }
        }
        this.addChildTask (ID, elementObjectArray["task"][index].getID());

        this.viewTask();
    },

    // добавляет айди дочернего элемента в список дочерних элементов задачи
    addChildTask (ID, childID) {
        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].getID() == ID) {
                elementObjectArray["task"][i].get()["childTask"].push (childID)
            }
        }
    },

    // удаляет айди дочернего элемента в список дочерних элементов задачи
    removeChildTask (ID, childID) {
        for (let i in elementObjectArray["task"]) {
            if (elementObjectArray["task"][i].getID() == ID) {
                elementObjectArray["task"][i]["configuration"]["childTask"].splice(childID, 1)
            }
        }
    },

    // изменить текущую задачу
    newCurrentTask (ID) {
        if (this.currentTask == ID) {
            this.currentTask = "";
            document.querySelector("#textTask").value = "";
            document.querySelector("#amountTask").value = "";
            document.querySelector("#doneTask").value = "";
            document.querySelector("#checkedTask").checked = false;
            document.querySelector("#importantTask").checked = false;
            this.viewTask();
        } else {
            this.currentTask = ID;
            for (let i in elementObjectArray["task"]) {
                if (this.currentTask == elementObjectArray["task"][i].getID()) {
                    document.querySelector("#textTask").value = elementObjectArray["task"][i].get()["title"];
                    document.querySelector("#amountTask").value = elementObjectArray["task"][i].get()["amount"];
                    document.querySelector("#doneTask").value = elementObjectArray["task"][i].get()["doneAmount"];
                    document.querySelector("#checkedTask").checked = elementObjectArray["task"][i].get()["checked"];
                    document.querySelector("#importantTask").checked = elementObjectArray["task"][i].get()["important"];
                }
            }
            this.viewTask();
        }
    },

    // показать все задачи, через граф. интерфейс
    viewTask() {
        document.querySelector("#container-view__inner").innerHTML = '';
        currentTaskText = `<p class="text_black text_current">Задача не выбрана!</p>`;
        for (let i in elementObjectArray["task"]) {
            if (this.currentContainer) {
                if (this.currentContainer == elementObjectArray["task"][i].get().parentContainer) {
                    if (this.currentTask == elementObjectArray["task"][i].getID()) {currentTaskText = `<p class="text_black text_current">Выбрана задача: ${elementObjectArray["task"][i].get()["title"]}</p>`;}

                    // проверка на level задачи, если он равен 0, то простая задача, иначе
                    if (elementObjectArray["task"][i].get().level == 0) {
                        document.querySelector("#container-view__inner").innerHTML += `
                        <div class="task" id="task_${elementObjectArray["task"][i].getID()}" style="margin-left: ${elementObjectArray["task"][i].get().level * 8}px;">
                            <p class="task__title">${elementObjectArray["task"][i].get()["title"]}</p>
                            <p class="task__amount">Выполнено: ${elementObjectArray["task"][i].get().doneAmount} из ${elementObjectArray["task"][i].get().amount}</p>
                            <p class="task__date">${elementObjectArray["task"][i].get().date}</p>
                            <p class="task__time">${elementObjectArray["task"][i].get().time}</p>
                            <div class="task__progress-bar">
                                <div class="progress" id="task__progress_${elementObjectArray["task"][i].getID()}" style="width: ${elementObjectArray["task"][i].get().doneAmount/elementObjectArray["task"][i].get().amount*100}%;"></div>
                            </div>
                            <div class="task__categories" id="task__categories_${elementObjectArray["task"][i].getID()}"></div>
                            <div class="task__buttons">
                                <button class="button center-justify button_select" onclick="launcher.newCurrentTask(${elementObjectArray["task"][i].getID()})">выбрать</button>
                                <button class="button center-justify button-create-subtask" onclick="launcher.createSubtask (${elementObjectArray["task"][i].getID()}, ${elementObjectArray["task"][i].get().level})">Добавить подзадачу</button>
                                <button class="button center-justify button_important" onclick="launcher.importantTask (${elementObjectArray["task"][i].getID()})">Пометить как важно</button>
                                <button class="button center-justify button_checked" onclick="launcher.checkedTask (${elementObjectArray["task"][i].getID()})">Пометить как выполнено</button>
                            </div>
                        </div>
                        <div class="subtask task__subtask" id="task__subtask_${elementObjectArray["task"][i].getID()}"></div>
                    `;
                    } else {
                        document.querySelector(`#task__subtask_${elementObjectArray["task"][i].get().parentTask}`).innerHTML += `
                        <div class="task" id="task_${elementObjectArray["task"][i].getID()}" style="margin-left: ${elementObjectArray["task"][i].get().level * 8}px;">
                            <p class="task__title">${elementObjectArray["task"][i].get()["title"]}</p>
                            <p class="task__amount">Выполнено: ${elementObjectArray["task"][i].get().doneAmount} из ${elementObjectArray["task"][i].get().amount}</p>
                            <p class="task__date">${elementObjectArray["task"][i].get().date}</p>
                            <p class="task__time">${elementObjectArray["task"][i].get().time}</p>
                            <div class="task__progress-bar">
                                <div class="progress" id="task__progress_${elementObjectArray["task"][i].getID()}" style="width: ${elementObjectArray["task"][i].get().doneAmount/elementObjectArray["task"][i].get().amount*100}%;"></div>
                            </div>
                            <div class="task__categories" id="task__categories_${elementObjectArray["task"][i].getID()}"></div>
                            <div class="task__buttons">
                                <button class="button center-justify button_select" onclick="launcher.newCurrentTask(${elementObjectArray["task"][i].getID()})">выбрать</button>
                                <button class="button center-justify button-create-subtask" onclick="launcher.createSubtask (${elementObjectArray["task"][i].getID()}, ${elementObjectArray["task"][i].get().level})">Добавить подзадачу</button>
                                <button class="button center-justify button_important" onclick="launcher.importantTask (${elementObjectArray["task"][i].getID()})">Пометить как важно</button>
                                <button class="button center-justify button_checked" onclick="launcher.checkedTask (${elementObjectArray["task"][i].getID()})">Пометить как выполнено</button>
                            </div>
                        </div>
                        <div class="subtask" id="task__subtask_${elementObjectArray["task"][i].getID()}">
                    `;
                    }

                    if (elementObjectArray["task"][i].get().doneAmount >= elementObjectArray["task"][i].get().amount) {
                        elementObjectArray["task"][i].get().checked = true;
                    }
                    if (elementObjectArray["task"][i].getID() == this.currentTask) {document.querySelector(`#task_${elementObjectArray["task"][i].getID()}`).querySelector(".button_select").classList.add('button_current')}
                    else {document.querySelector(`#task_${elementObjectArray["task"][i].getID()}`).querySelector(".button_select").classList.add('button')}
                    if (elementObjectArray["task"][i].get().important) {document.querySelector(`#task_${elementObjectArray["task"][i].getID()}`).classList.add('task_important')}
                    if (elementObjectArray["task"][i].get().checked) {document.querySelector(`#task_${elementObjectArray["task"][i].getID()}`).classList.add('task_checked')}
                    console.log(controller.getAllCategoryForTask (elementObjectArray["task"][i].getID()));
                    let categoriesForTask = controller.getAllCategoryForTask (elementObjectArray["task"][i].getID()) || "нет категорий";
                    document.querySelector(`#task__categories_${elementObjectArray["task"][i].getID()}`).innerHTML = `<p class="text">Категории: ${categoriesForTask}</p>`
                }
            }
        }
        document.querySelector(".block-current").innerHTML = currentTaskText;
    },

    // текущий контейнер
    currentContainer: '',
    
    // создаёт контейнер, через граф. интерфейс
    createContainer () {
        now = new Date ();
        createdCurrentContainer = new Container({
            title: document.querySelector("#textContainer").value,
            date: `${now.getDate()+1 < 10 ? '0' + now.getDate() : now.getDate()}.${now.getMonth()+1 < 10 ? '0' + now.getMonth() : now.getMonth()}.${now.getFullYear()}`,
            time: `${now.getHours()+1 < 10 ? '0' + now.getHours() : now.getHours()}:${now.getMinutes()+1 < 10 ? '0' + now.getMinutes() : now.getMinutes()}:${now.getSeconds()+1 < 10 ? '0' + now.getSeconds() : now.getSeconds()}`,
        }, false);
        this.viewContainer();
    },

    // удалить контейнер, через граф. интерфейс
    deleteContainer () {
        registry.removeItem("container", this.currentContainer);
        controller.dellAllTaskFromContainer (this.currentContainer);
        this.currentContainer = '';
        this.viewContainer();
    },

    // изменить контейнер, через граф. интерфейс
    changeContainer () {
        for (let i in elementObjectArray["container"]) {
            if (elementObjectArray["container"][i].getID() == this.currentContainer) {
                index = i;
            }
        }

        let newConfiguration = {
            title: document.querySelector("#textContainer").value,
            date: elementObjectArray["container"][index].get().date,
            time: elementObjectArray["container"][index].get().time,
        }
        registry.changeItem("container", this.currentContainer, newConfiguration);
        this.viewContainer();
    },

    // изменить текущий контейнер
    newCurrentContainer (ID) {
        if (this.currentContainer == ID) {
            this.currentContainer = "";
            document.querySelector("#textContainer").value = "";
            this.viewContainer();
        } else {
            this.currentContainer = ID;
            for (let i in elementObjectArray["container"]) {
                if (elementObjectArray["container"][i].getID() == this.currentContainer) {
                    document.querySelector("#textContainer").value = elementObjectArray["container"][i].get()["title"];
                }
            }
            this.viewContainer();
        }
    },

    // показать все контейнеры, через граф. интерфейс
    viewContainer () {
        containerViewInner = document.querySelector("#container-view__inner");
        refactorContainer = ''
        currentContainerText = `<p class="text_black text_current">Контейнер не выбран!</p>`;
        for (let i in elementObjectArray["container"]) {
            if (elementObjectArray["container"][i].getID() == this.currentContainer) {
                if (this.currentContainer == elementObjectArray["container"][i].getID()) {currentContainerText = `<p class="text_black text_current">Выбрана задача: ${elementObjectArray["container"][i].get()["title"]}</p>`;}
                refactorContainer += `
                <div class="container" id="container_${elementObjectArray["container"][i].getID()}">
                    <p class="container__title">${elementObjectArray["container"][i].get()["title"]}</p>
                    <p class="container__date">Дата: ${elementObjectArray["container"][i].get().date}</p>
                    <p class="container__time">Время: ${elementObjectArray["container"][i].get().time}</p>
                    <button class="button_current container__select-button" onclick="launcher.newCurrentContainer(${elementObjectArray["container"][i].getID()})">выбрать</button>
                </div> 
                `
            } else {
                refactorContainer += `
                <div class="container" id="conitaner_${elementObjectArray["container"][i].getID()}">
                    <p class="container__title">${elementObjectArray["container"][i].get()["title"]}</p>
                    <p class="container__date">Дата: ${elementObjectArray["container"][i].get().date}</p>
                    <p class="container__time">Время: ${elementObjectArray["container"][i].get().time}</p>
                    <button class="button container__select-button" onclick="launcher.newCurrentContainer(${elementObjectArray["container"][i].getID()})">выбрать</button>
                </div>
                `
            }
            
        }
        document.querySelector(".block-current").innerHTML = currentContainerText;
        containerViewInner.innerHTML = refactorContainer;
    },

    // текущая категория
    currentCategory: "",

    // создание категории
    createCategory () {
        now = new Date ();
        newCategory = new Category({
            title: document.querySelector("#js-titleCategory").value,
            description: document.querySelector("#js-descriptionCategory").value,
            tasks: [],    
            date: `${now.getDate()+1 ? '0' + now.getDate() : now.getDate()}.${now.getMonth()+1 < 10 ? '0' + now.getMonth() : now.getMonth()}.${now.getFullYear()}`,
            time: `${now.getHours()+1 < 10 ? '0' + now.getHours() : now.getHours()}:${now.getMinutes()+1 < 10 ? '0' + now.getMinutes() : now.getMinutes()}:${now.getSeconds()+1 < 10 ? '0' + now.getSeconds() : now.getSeconds()}`,
        }, false);
        this.viewCategory();
    },

    // удаление категории
    deleteCategory () {
        registry.removeItem("category", this.currentCategory);
        this.currentCategory = '';
        this.viewCategory();
    },

    // изменить текущий контейнер
    newCurrentCategory (ID) {
        if (this.currentCategory == ID) {
            this.currentCategory = "";
            this.viewCategory();
        } else {
            this.currentCategory = ID;
            this.viewCategory();
        }
    },

    // показать все категории, через граф. интерфейс
    viewCategory () {
        document.querySelector("#container-view__inner").innerHTML = '';
        currentCategoryText = `<p class="text_black text_current">Категория не выбрана!</p>`;
        for (let i in elementObjectArray["category"]) {
            if (this.currentCategory == elementObjectArray["category"][i].getID()) {currentCategoryText = `<p class="text_black text_current">Выбрана категория: ${elementObjectArray["category"][i].get()["title"]}</p>`;}
            tasks = this.getAllTasksFromCategory (i)
            document.querySelector("#container-view__inner").innerHTML += `
            <div class="category" id="category_${elementObjectArray["category"][i].getID()}">
                <p class="category__title">${elementObjectArray["category"][i].get()["title"]}</p>
                <p class="category__description">${elementObjectArray["category"][i].get().description}</p>
                <p class="category__date">Дата: ${elementObjectArray["category"][i].get().date}</p>
                <p class="category__time">Время: ${elementObjectArray["category"][i].get().time}</p>
                <button class="button button_select category__select-button" onclick="launcher.newCurrentCategory(${elementObjectArray["category"][i].getID()})">выбрать</button>
                <select class="button button_select category__select-input" id="category_inner_${elementObjectArray["category"][i].getID()}">
                </select>
            </div>
            `
            for (j in tasks) {
                document.querySelector(`#category_inner_${elementObjectArray['category'][i].getID()}`).innerHTML += `
                    <br> ${tasks[j]["title"]}
                    <option value="${tasks[j]["ID"]}">${tasks[j]["title"]}</option>
                `
            }    
            if (elementObjectArray["category"][i].getID() == this.currentCategory) {document.querySelector(`#category_${elementObjectArray["category"][i].getID()}`).querySelector(".button_select").classList.add('button_current')}   
        }
        document.querySelector(".block-current").innerHTML = currentCategoryText;
        this.viewAllTasksForCategoryPanel ()
    },

    // добавляет задачу в категорию
    addTaskToCategory (taskID) {
        elementObjectArray.category[this.findCategoryIndex()].get()["tasks"].push (taskID);
        newConfiguration = {
            title: elementObjectArray.category[this.findCategoryIndex()].get()["title"],
            description: elementObjectArray.category[this.findCategoryIndex()].get()["description"],
            tasks: elementObjectArray.category[this.findCategoryIndex()].get()["tasks"],    
            date: elementObjectArray.category[this.findCategoryIndex()].get()["date"],
            time: elementObjectArray.category[this.findCategoryIndex()].get()["time"],
        }
        registry.changeItem("category", this.currentCategory, newConfiguration);
    },

    // удаляет задачу из категории
    delTaskToCategory (taskID) {
        let categoryIndex = this.findCategoryIndex();
        let taskIndex = elementObjectArray["category"][categoryIndex].get()["tasks"].indexOf(taskID);
        if (taskIndex != -1) {
            elementObjectArray["category"][categoryIndex]["configuration"]["tasks"].splice(taskIndex, 1);
            newConfiguration = {
                title: elementObjectArray.category[this.findCategoryIndex()].get()["title"],
                description: elementObjectArray.category[this.findCategoryIndex()].get()["description"],
                tasks: elementObjectArray.category[this.findCategoryIndex()].get()["tasks"],    
                date: elementObjectArray.category[this.findCategoryIndex()].get()["date"],
                time: elementObjectArray.category[this.findCategoryIndex()].get()["time"],
            }
            registry.changeItem("category", this.currentCategory, newConfiguration);
        }
    },

    // получить все задачи из категории. формат: [id, title]
    getAllTasksFromCategory (categoryIndex) {
        result = [];
        for (let i in elementObjectArray["category"][categoryIndex].get()["tasks"]) {
            task = [];
            for (let j in elementObjectArray["task"]) {
                if (elementObjectArray["task"][j].getID() == elementObjectArray["category"][categoryIndex].get()["tasks"][i]) {
                    task = [
                        elementObjectArray["task"][j].getID(),
                        elementObjectArray["task"][j].get()["title"]
                    ];
                    break;
                }
            }
            result.push ({
                title: task[1],
                ID: task[0],
            });
        }
        return result;
    },

    // удаляет все задачи из категории
    clearAllTaskFromCategory () {
        let categoryIndex = this.findCategoryIndex();
        elementObjectArray["category"][categoryIndex].get()["tasks"] = [];
    },

    // ищет текущую текущую категорию и возращает её айди
    findCategoryIndex () {
        for (let i in elementObjectArray["category"]) {
            if (elementObjectArray["category"][i].getID() == this.currentCategory) {
                index = i;
                return index
            }
        }
    },

    // вывод всех задач в блок "категории" слева
    viewAllTasksForCategoryPanel () {
        panel = document.querySelector("#js-select-tasksForCategory");
        panelText = ''

        for (let i in elementObjectArray["task"]) {
            let containerTitle = elementObjectArray["task"][i].getContainer().title;
            panelText += `<option value="${elementObjectArray["task"][i].getID()}">[${containerTitle}] ${elementObjectArray["task"][i]["configuration"]["title"]}</option>`
        }

        panel.innerHTML = panelText;
    },
}; 

elementObjectArray = registry.createElementObjectArray ();

let leftPanelPopups = new Popuper ();
let globalPopups = new Popuper ();
let fullScreens = new Popuper ();

leftPanelPopups.reg(["js-container-task", "js-container-container", "js-container-category", "js-container-setting"], "display");
leftPanelPopups.localShowForID("js-container-container");

globalPopups.reg(["js-popup-about", "js-popup-update"], "display");
globalPopups.hideAll();

fullScreens.reg(["js-full-screen_debug", "js-full-screen_clear"],"display", "grid");
fullScreens.hideAll();

launcher.start();

document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
        switch(this.OPTION) {
            case "block": this.popupElement.style.display = "block"; break;
            case "grid": this.popupElement.style.display = "grid"; break;
            case "inline": this.popupElement.style.display = "inline"; break;
            case "inline-block": this.popupElement.style.display = "inline-block"; break;
            default:  this.popupElement.style.display = "block";
        }

        switch (event.code) {
            case "Digit1": leftPanelPopups.localShowForID("js-container-task"); break;
            case "Digit2": leftPanelPopups.localShowForID("js-container-container"); break;
            case "Digit3": leftPanelPopups.localShowForID("js-container-category"); break;
            case "Digit4": leftPanelPopups.localShowForID("js-container-setting"); break;
            case "KeyZ": launcher.importantTask (launcher.currentTask); break;
            case "KeyX": launcher.checkedTask (launcher.currentTask); break;
            case "Enter": if (document.querySelector("#js-container-task").style.display == "block") {launcher.createTask();}
            else if (document.querySelector("#js-container-container").style.display == "block") {launcher.createContainer();}
            else if (document.querySelector("#js-container-category").style.display == "block") {launcher.createCategory();} break;
            default: return false;
        }
    }
});