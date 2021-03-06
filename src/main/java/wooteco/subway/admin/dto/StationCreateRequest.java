package wooteco.subway.admin.dto;

import javax.validation.constraints.NotBlank;

import wooteco.subway.admin.domain.Station;

public class StationCreateRequest {
	@NotBlank
	private String name;

	private StationCreateRequest() {
	}

	public String getName() {
		return name;
	}

	public Station toStation() {
		return new Station(name);
	}
}
