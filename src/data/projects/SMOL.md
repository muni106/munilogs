---
title: SMOL
author: Mounir Samite
pubDatetime: 2023-04-25T05:17:19Z
slug: smol
featured: false
draft: false
tags:
  - java
  - javaFX
  - object-oriented-programming
  - videogame
  - collaboration
# ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: A Smash the MOL game made using java.
---

# Situation
During my Object Oriented Programming (OOP) course at university, I collaborated with three classmates to develop a 2D arcade game called 'SMOL' using Java and JavaFX. The goal was to create a top-down game where players defend vegetable fields from invading moles by smashing them with a hammer. The game increases in difficulty as the player's score rises, decreasing the time between mole appearances and altering the probability of different mole types generating. This project required us to apply advanced programming concepts and design patterns within a tight timeline.

# Tasks
My primary responsibilities in the project were twofold:

- **Window Management:** I needed to manage the game's window states effectively to enhance modularity and maintainability. This involved handling various game screens such as the main menu, gameplay screen, and game over screen.
- **Game World Management:** I was tasked with creating a container for all game entities and components that could efficiently update their states during gameplay. This was essential for managing interactions between entities like the player, moles, vegetables, hammer, and walls.

The challenge was to implement these features in alignment with the Model-View-Controller (MVC) architectural pattern, ensuring seamless interaction between the Model, View, and Controller components.

# Action

## Window Management
- **problem**: managing different game windows dynamically was crucial for a smooth user experience and for keeping the codebase modular.
- **implemented solution**: I used the State Design Pattern for window management, mapping each window state, such as the main menu or the game screen, to its own class so that all state-specific behaviour stayed neatly encapsulated. This structure let the application switch fluidly between states in response to user actions or game events without descending into redundant or tangled code, and it ensured every window always behaved appropriately while greatly boosting the modularity and reusability of the codebase.

```Java file=src/main/java/it/unibo/smol/view/api/WindowState.java
package it.unibo.smol.view.api;

import java.io.IOException;
import javafx.stage.Stage;

/**
* Interface where the implementation decides the behavior of the window.
*/

public interface WindowState {
    /**
    * Method that initialize the stage.
    * 
    * @param stage The stage where our game is running.
    * @throws IOException Exception if the stage can't be rendered.
    */
    void render(Stage stage) throws IOException;

}
```


```Java file=src/main/java/it/unibo/smol/view/impl/MenuState.java
package it.unibo.smol.view.impl;

import java.io.IOException;
import java.util.logging.Level;
...

/**
* Implementation of the menu state, it renders the menu.
*/
public final class MenuState implements WindowState {
    private static Logger logger = Logger.getLogger("menuLogger");
    private static final int MENU_ANIM_DURATION = 500;
    private final GameEngine gameEngine = new GameEngineImpl();
    private String currentSkins;

    /**
    * constructor that generate a menu state with a default skin value.
    */
    public MenuState() {
        this.currentSkins = Constant.KEY_PIXEL_SKINS;
    }

    /**
    * constructor that generate a menu state with a decided skin value.
    * @param skins decided skin
    */
    public MenuState(final String skins) {
        this.currentSkins = skins;
    }
    /**
    * {@inheritDoc}
    */
    @Override
    public void render(final Stage primaryStage) throws IOException {
        try {
            this.start(primaryStage);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "MenuStateError::", e);
        }
    }

        ... 

        primaryStage.show();
    }
    ... 
```


```Java file=src/main/java/it/unibo/smol/view/impl/GameViewState.java
package it.unibo.smol.view.impl;

...
import javafx.stage.WindowEvent;

/**
 * Implementation of the main state, it renders the game.
 */
public class GameViewState implements WindowState {

    /**
     * constructor made to get the gamseState.
     * @param gameState
     * @param keyInputs
     * @param mouseInputs
     */
    public GameViewState(final Optional<GameState> gameState,
        final Optional<KeyInputs> keyInputs, final Optional<MouseInputs> mouseInputs) {
        ...
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void render(final Stage stage) {
        ...
    }

    private void start(final Stage stage) throws IOException {
        final var root = new Pane();
        final var scene = new Scene(root, GameMap.WIDTH * GameMap.SCREEN_PROP_X - 1,
                GameMap.HEIGHT * GameMap.SCREEN_PROP_Y - 1, Color.BLACK);
        ...
        stage.show();
    }
    ...
}
```

## MVC Pattern
- *Model*:
    - The 'World' class and game entities formed the Model, containing the game's data and logic.
- *View*:
    - Implemented the **'WindowState'** interface for the View component, which managed the visual representation of different game states.
    - Utilized classes like **'GraphicsDraw'** and **'LoadImgs'** to handle image loading and rendering.
- *Controller*:
    - Used the **'GameState'** interface as the Controller to facilitate communication between the Model and View.
    - Handled user inputs and notified the Model of changes, ensuring the game responded appropriately to player actions.
## Game World Management
- *Creating the `World` Class*:
- I developed the **'World'** class to act as a container for all game entities and components.
- Organized entities based on their types (player, moles, vegetables, etc.) and provided getters that returned copies to maintain encapsulation and prevent unintended modifications.
- *Updating Entity States:*
- Implemented an iteration mechanism similar to the **Iterator Pattern**. Each entity's `update()` method was called within a loop to refresh their states.
- These updates were passed to the **GameLoop** via the **GameState** interface, which managed the game's timing and ensured entities were updated at a consistent frame rate (FPS).
## Collaboration and Communication 
- Regularly communicated with team members to integrate our components seamlessly.
- Conducted code reviews to ensure consistency with coding standards and architectural patterns.
- Documented my code thoroughly to make it easier for team members to understand and maintain.

# Results
Our team brought the game from concept to completion, delivering a smooth running JavaFX title that satisfied every project requirement while exemplifying sound object oriented design. By architecting the interface around the State pattern and delegating entity logic to a dedicated World class, we achieved a highly modular codebase that future developers can extend or refactor with minimal ripple effects. Along the way, I deepened my grasp of patterns such as State and Iterator, sharpened my Java and GUI programming skills, and saw firsthand how adhering to MVC principles promotes scalability and maintainability. Equally important, the project strengthened my teamwork and communication abilities as we wove our individual contributions into one cohesive, engaging product.

![final result pixeled](@/assets/images/projects/smol1.gif)
![final result vectorial](@/assets/images/projects/smol2.gif)


# More
