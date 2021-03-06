# Houses
Richer players on the server have the ability to purchase a house for themselves on Las Venturas
Playground. The house's interior can be decorated by the player with objects, there may be parking
spots for personalized vehicles available 

The prices for houses, as well as any of the possible accessories, will be determined by the
[economy algorithms](https://github.com/LVPlayground/playground/tree/master/javascript/features/economy)
as opposed to administrators. This enables us to keep control over pricing.

The following concepts are important for this feature:
  - **House locations** can be created by administrators around San Andreas. These define where
    players are able to purchase the houses of their liking.
  - House locations can have zero or more **parking lots**. These are associated with the
    location as opposed to the house, and can be created by administrators.
  - **Houses** are the interiors linked to a _house location_. They are owned by a particular player
    and can only be accessed by a limited set of players.


## What happens when you enter a house?
There are several scenarios that may occur when a player enters a house marker.

  - The player is _not_ an administrator.
    - **The location is available**: Message inviting them to purchase the location.
    - **They've got access to the house**: Teleported to the house's interior.
    - **They don't have access to the house**: Error message.
  - The player is an administrator.
    - **The location is available**: Message inviting them to purchase the location.
    - **They've got access to the house**: Teleported to the house's interior.
    - **They don't have access to the house**: Error message, with an option to force-enter.

Administrators can modify or remove a house by using the `/house modify` command.


## Command: /house
The `/house` command is available to administrators for administrating the available houses. It has
the following options:

  - **/house buy**: Begins the purchase process for the house you're currently standing in.
  - **/house create**: Creates a new house location. The price range of houses on this location is
    predetermined by an algorithm, and cannot be modified.
  - **/house goto [filter]**: Displays your houses and enables teleporting to them. Administrators
    will be able to see the houses owned by others as well.
  - **/house interior [id]**: Enables Management to quickly teleport to the given interior Id.
  - **/house modify**: Modifies settings for the house closest to the administrator issuing the
    command. Enables creation and removal of parking spots.
  - **/house settings**: Enables you to change your house's settings whilst inside of it.
  - **/house**: Displays information about the command.

In addition, when interactive operations are in progress (adding or removing parking lots, for
example), the following commands can be used:

  - **/house cancel**: Cancel the current operation.
  - **/house remove [id]**: Removes the object identified by `id` from the house.
  - **/house save**: Save the result of the current operation.


## FAQ: Where can houses be located?
Houses can be located throughout San Andreas, with the precise locations left at the discretion of
our administrators. The red zones on the [residential value map](https://sa-mp.nl/tools/visualize-map/)
are excluded from this— only Management members can authorize houses to be created there.


## FAQ: Who's got access to a house?
By default, the owner of a house and their [friends](../friends/). Administrators can always access
a house. Players who are not registered with Las Venturas Playground are not able to access houses.

Owners of a house can use `/house settings` to change the access rules, having the option to either
allow everybody, their friends and gang, just their friends or make it an entirely private house.


## FAQ: Can I own multiple houses?
Yes. Regular players will be able to own a single house, but VIP members will be able to own up to
three houses. The houses must be at least 500 units away from each other. Management members are
allowed to own up to a hundred houses, with no distance restrictions.


## FAQ: How many parking lots can my house have?
There is no defined limit to the number of parking lots that can be added to a house, but
administrators are encouraged to keep the number of parking lots within reason.


## FAQ: Do I pay for a house with cash money, or my bank account?
Payments will be made from your bank account.


## FAQ: As an admin, can I change a house's price?
No. We've learned from the property system that the economy becomes a chaos when administrators can
determine the prices of in-game objects. Sorry.
