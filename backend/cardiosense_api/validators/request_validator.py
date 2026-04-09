from typing import Any

import numpy as np


def _ensure_numeric_list(values: Any, field_name: str) -> list[float]:
    if not isinstance(values, list) or not values:
        raise ValueError(f"'{field_name}' must be a non-empty list.")

    numeric_values = []
    for item in values:
        if not isinstance(item, (int, float)):
            raise ValueError(f"All values in '{field_name}' must be numeric.")
        numeric_values.append(float(item))

    return numeric_values


def validate_rf_payload(payload: dict[str, Any]) -> np.ndarray:
    if not payload:
        raise ValueError("Request body must be valid JSON.")

    features = payload.get("features")
    numeric_features = _ensure_numeric_list(features, "features")

    return np.array([numeric_features], dtype=np.float32)


def validate_lstm_payload(payload: dict[str, Any]) -> np.ndarray:
    if not payload:
        raise ValueError("Request body must be valid JSON.")

    series = payload.get("series")
    if not isinstance(series, list) or len(series) != 15:
        raise ValueError("'series' must be a list containing exactly 15 timesteps.")

    validated_steps = []
    for step in series:
        validated_steps.append(_ensure_numeric_list(step, "series timestep"))

    feature_count = len(validated_steps[0])
    if feature_count == 0:
        raise ValueError("Each timestep in 'series' must contain at least one feature.")

    if any(len(step) != feature_count for step in validated_steps):
        raise ValueError("All timesteps in 'series' must have the same number of features.")

    return np.array([validated_steps], dtype=np.float32)
