import numpy as np 
import pandas as pd 
import random
import time
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from collections import Counter

csv = pd.read_csv('energy_bill_data.csv')
# best parameters [67, 2, 0.26, 4, 0.18]
# Separate features and target variable
X = csv.drop('amount_paid', axis=1)
y = csv['amount_paid']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

parameter_ranges = {
    'n_estimators': range(1, 100, 2),
    'max_depth': range(1, 10),
    'learning_rate': np.arange(0.01, 0.3, 0.01),
    'min_child_weight': range(1, 10),
    'gamma': np.arange(0, 0.3, 0.01)
}

POPULATION_SIZE = 2000
NUM_GENERATIONS = 200
NUMBER_OF_CHILDREN = 1000
MUTATION_CHANCE = 0.2

class Solution:
    """
    Class used to represent a solution in the population.
    """
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters
        fitness = self.evaluate_fitness()
        self.fitness = fitness

    def evaluate_fitness(self):
        """
        Evaluates the fitness of the solution by creating and evaluating the random forest model.
        """
        # Create and evaluate the random forest model with given hyperparameters
        print(f'Evaluating fitness for hyperparameters: {self.hyperparameters}')

        xgb_reg = XGBRegressor(
            n_estimators=self.hyperparameters[0],
            max_depth=self.hyperparameters[1],
            learning_rate=self.hyperparameters[2],
            min_child_weight=self.hyperparameters[3],
            gamma=self.hyperparameters[4]
        )
        # RFM with default parameters
        # rfm = XGBClassifier()
        xgb_reg.fit(X_train, y_train)

        # Use regression metrics for fitness evaluation, e.g., mean squared error (MSE)
        y_pred = xgb_reg.predict(X_test)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        print(f'Result for hyperparameters {self.hyperparameters}: {rmse}')
        return rmse

def initialize_population() -> list:
    """
    Initializes the population with random hyperparameters.
    """
    population = []
    for i in range(POPULATION_SIZE):
        hyperparameters = [random.choice(param_range) for param_range in parameter_ranges.values()]
        solution = Solution(hyperparameters)
        population.append(solution)
    return population

def select_parent(population: list) -> Solution:
    """
    Selects a parent from the population using roulette wheel selection.
    """
    # Extract fitness scores.
    fitness_scores = [solution.fitness for solution in population]

    # Create a roulette wheel.
    roulette_wheel = np.cumsum(fitness_scores/np.sum(fitness_scores))

    # Generate a random number and get the parent
    random_number = np.random.rand()
    for index, score in enumerate(roulette_wheel):
        if random_number <= score:
            return population[index]

def crossover(parent1: Solution, parent2: Solution) -> Solution:
    """
    Performs crossover between two parents.
    """
    # Make sure that the parents are different
    while parent1 == parent2:
        parent2 = select_parent(population)

    # Making sure that the parent doesn't copy itself, so we don't get the same solution
    random_index = random.randint(1, 3)
    print(f'Using parent 1: {parent1.hyperparameters[:random_index]} and parent 2: {parent2.hyperparameters[random_index:]} with random index: {random_index}')
    child = parent1.hyperparameters[:random_index] + parent2.hyperparameters[random_index:]
    return child

def mutate(offspring: Solution) -> Solution:
    """
    Mutates the offspring with a given chance.
    """
    for index, _ in enumerate(offspring):
        if random.random() < MUTATION_CHANCE:
            offspring[index] = random.choice(parameter_ranges[list(parameter_ranges.keys())[index]])
    return offspring

if __name__ == '__main__':
    print("Creating initial population and evaluating fitness")
    population = initialize_population()

    start_time = time.time()

    # Run the simulation for a given number of generations
    for generation in range(NUM_GENERATIONS):
        print(f"\nStarting calculations for generation {generation + 1}:")

        # For a predefined number of children, select two parents, perform crossover and mutation
        # and add the new offspring to the population
        new_offsprings = []
        for i in range(NUMBER_OF_CHILDREN):
            parent1 = select_parent(population)
            parent2 = select_parent(population)
            offspring = crossover(parent1, parent2)
            mutated_offspring = mutate(offspring)

            new_offsprings.append(Solution(mutated_offspring))

        # Appending the new members of the population, sorting them and keeping only the best ones
        population += new_offsprings
        best_solution = sorted(population, key=lambda solution: solution.fitness)
        population = best_solution[:POPULATION_SIZE]

        print(f'End of generation {generation + 1}, current solutions:')
        for solution in population:
            print(f'Hyperparameters: {solution.hyperparameters}, Fitness: {solution.fitness:.4f}')

    end_time = time.time()
    elapsed_time = end_time - start_time

    # Fetching the best solution from the population
    best_solution = min(population, key=lambda solution: solution.fitness)
    best_hyperparameters = best_solution.hyperparameters
    best_rmse = best_solution.fitness

    print(f"\nBest Hyperparameters: {best_hyperparameters}")
    print(f"Best Accuracy: {best_rmse:.4f}")

    print(f"Time Elapsed: {elapsed_time:.2f} seconds")
